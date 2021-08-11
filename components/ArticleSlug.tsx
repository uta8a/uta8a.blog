import Head from 'next/head';
import React from 'react';
import { NextPage } from 'next';
import path from 'path';
import fs from 'fs-extra';
import { DOMParser } from 'linkedom';

import markdownToHtml from 'zenn-markdown-html';
import { MainContainer } from '@components/MainContainer';
import { ContentBody } from '@components/ContentBody';
import { Article, Props } from '@types';
import matter from 'gray-matter';

const SlugPage: NextPage<Props> = (props: Props) => {
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

const getArticleBySlug = (article_type: string, slug: string): Article => {
  // content/:type/slug/index.md
  const type = article_type;
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

const filterImage = (article_type: string) => (slug: string, src: string) => {
  if (/^http/.test(src)) {
    return src;
  } else if (/\.\//.test(src)) {
    return `/content/${article_type}/${slug}/${src.substring(2)}`;
  } else {
    return `/content/${article_type}/${slug}/${src}`;
  }
};

export { SlugPage, getArticleBySlug, filterImage };
