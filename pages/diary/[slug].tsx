import Head from 'next/head';
import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import path from 'path';
import fs from 'fs-extra';
import { DOMParser, parseHTML } from 'linkedom';

// import escapeHtml from 'escape-html';
import markdownToHtml from 'zenn-markdown-html';
import { MainContainer } from '@components/MainContainer';
import { ContentBody } from '@components/ContentBody';
// import { getArticleBySlug } from '@utils/api/articles';
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
          content={`https://blog.uta8a.net/diary/${article.slug}`}
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
  const type = 'diary';
  const targetDir = path.join(process.cwd(), 'content', type);
  const dirs = await fs.readdir(targetDir);
  const paths = dirs.map((dir) => ({
    params: { slug: dir },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params !== undefined ? (params.slug as string) : '';
  const article = getArticleBySlug(slug);
  let content = markdownToHtml(
    article.content === undefined ? 'error' : article.content,
  );
  const dp = new DOMParser();
  const document = dp.parseFromString(content, 'text/html');
  document.querySelectorAll('img').forEach((e) => {
    e.src = filterImage(slug, e.src);
  });
  content = document.toString();
  return {
    props: {
      article: {
        ...article,
        content,
        slug,
      },
    },
  };
};

const getArticleBySlug = (slug: string): Article => {
  // content/:type/slug/index.md
  const type = 'diary';
  const fullPath = path.join(process.cwd(), 'content', type, slug, 'index.md');
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
    type: 'diary',
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

const filterImage = (slug: string, src: string) => {
  if (/^http/.test(src)) {
    return src;
  } else if (/\.\//.test(src)) {
    return `/content/diary/${slug}/${src.substring(2)}`;
  } else {
    return `/content/diary/${slug}/${src}`;
  }
};

export default Page;
