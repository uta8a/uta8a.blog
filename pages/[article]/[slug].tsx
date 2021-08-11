import Head from 'next/head';
import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import fs from 'fs-extra';
import { DOMParser } from 'linkedom';
import markdownToHtml from 'zenn-markdown-html';
import { MainContainer } from '@components/MainContainer';
import { ContentBody } from '@components/ContentBody';
import { Article } from '@types';
import matter from 'gray-matter';

type Props = {
  article: Article;
};

const Page: NextPage<Props> = (props: Props) => {
  const { article } = props;

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html" charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={article.content?.slice(0, 20)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:type" content="image/png" />
        <meta
          property="og:url"
          content={`https://blog.uta8a.net/${article.type}/${article.slug}`}
        />
        <meta name="og:description" content={article.content?.slice(0, 20)} />
        <meta property="og:image" content="/uta8a.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={article.title} />
        <meta
          name="twitter:description"
          content={article.content?.slice(0, 20)}
        />
        <meta name="twitter:image" content="/uta8a.png" />
        <title>
          {article.title || '無題'} - {'diaryです'}
        </title>
      </Head>
      <MainContainer>
        <article>
          <div>
            {/* <ArticleHeader article={article} /> */}
            <ContentBody content={article.content} title={article.title} />
          </div>
        </article>
      </MainContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const targetDir = path.join(process.cwd(), 'content');
  const pdirs = await fs
    .readdirSync(targetDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const paths: string[] = [];
  for (const pdir of pdirs) {
    const ds = await fs
      .readdirSync(path.join(targetDir, pdir), { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    ds.map((d) => {
      paths.push(`/${pdir}/${d}`);
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (params) => {
  const a =
    params.params !== undefined
      ? typeof params.params.article === 'string'
        ? params.params.article
        : ''
      : '';
  const b =
    params.params !== undefined
      ? typeof params.params.slug === 'string'
        ? params.params.slug
        : ''
      : '';
  const article = getArticleBySlug(a, b);
  let content = markdownToHtml(
    article.content === undefined ? 'error' : article.content,
  );
  const dp = new DOMParser();
  const document = dp.parseFromString(content, 'text/html');
  document.querySelectorAll('img').forEach((e) => {
    e.src = filterImage(a, b, e.src);
  });
  content = document.toString();
  return {
    props: {
      article: {
        ...article,
        content,
        b,
      },
    },
  };
};

const getArticleBySlug = (article: string, slug: string): Article => {
  const fullPath = path.join(
    process.cwd(),
    'content',
    article,
    slug,
    'index.md',
  );
  let fileRaw;
  try {
    fileRaw = fs.readFileSync(fullPath, 'utf8');
  } catch (e) {
    return {} as Article;
  }
  const { data, content } = matter(fileRaw);

  // const fields = ['slug', 'content', 'title', 'type', 'draft', 'date'];
  const initArticle: Article = {
    slug: '',
    content: '',
    title: '',
    type: undefined,
    draft: false,
    date: new Date(),
  };
  type Ty = keyof Article;
  const fields = Object.keys(initArticle) as Ty[];
  const item: Article = {
    slug: slug,
    date: new Date(),
  };
  fields.forEach((field) => {
    if (field === 'content') {
      item[field] = content;
    }
    if (data[field] !== undefined) {
      item[field] = data[field] as never;
    }
  });
  return item as Article;
};

const filterImage = (article: string, slug: string, src: string) => {
  if (/^http/.test(src)) {
    return src;
  } else if (/\.\//.test(src)) {
    return `/content/${article}/${slug}/${src.substring(2)}`;
  } else {
    return `/content/${article}/${slug}/${src}`;
  }
};

export default Page;
