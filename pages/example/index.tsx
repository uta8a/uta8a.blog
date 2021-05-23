import { GetStaticProps } from 'next';
import React from 'react';
import path from 'path';
import fs from 'fs-extra';
import Link from 'next/link';
import { Article } from '@types';
import matter from 'gray-matter';

type Props = {
  path: ArticleInfo[];
};
type ArticleInfo = {
  title: string | undefined;
  path: string;
};
export default function Index(props: Props): JSX.Element {
  return (
    <>
      <h1
        style={{
          fontSize: '2.25rem',
          paddingTop: '2rem',
          paddingLeft: '5rem',
        }}
      >
        /example
      </h1>
      <div
        style={{
          paddingTop: '1rem',
          paddingLeft: '5rem',
        }}
      >
        {props.path.map((e) => {
          return (
            <div
              key={e.path}
              style={{
                fontSize: '2rem',
                lineHeight: '2.5rem',
                // textAlign: 'center',
                paddingTop: '0.5rem',
              }}
            >
              <Link href={`example/${e.path}`} passHref>
                <a>&gt; {e.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const type = 'example';
  const targetDir = path.join(process.cwd(), 'content', type);
  const dirs = await fs.readdir(targetDir);
  const paths = [];
  for (const slug of dirs) {
    const article = getArticleBySlug(slug);
    paths.push({ title: article.title, path: slug });
  }
  return { props: { path: paths } };
};

const getArticleBySlug = (slug: string): Article => {
  // content/:type/slug/index.md
  const type = 'example';
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
    type: 'example',
    draft: false,
    date: new Date(),
  };
  type Ty = keyof Article;
  const fields = Object.keys(initArticle) as Ty[];
  // const C = Object.keys(B);
  // console.log('key!', B);
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
