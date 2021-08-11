import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import path from 'path';
import fs from 'fs-extra';
import Link from 'next/link';
import { Article } from '@types';
import matter from 'gray-matter';
import { useRouter } from 'next/router';

type Props = {
  path: ArticleInfo[];
};
type ArticleInfo = {
  title: string | undefined;
  path: string;
  date: Date;
};
export default function Index(props: Props): JSX.Element {
  const router = useRouter();
  const { article } = router.query;
  return (
    <>
      <h1
        style={{
          fontSize: '2.25rem',
          paddingTop: '2rem',
          paddingLeft: '5rem',
        }}
      >
        {`/${article}`}
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
                paddingTop: '0.5rem',
              }}
            >
              <Link href={`${article}/${e.path}`} passHref>
                <a>&gt; {e.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
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
      paths.push(`/${pdir}`);
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const a =
    params !== undefined
      ? typeof params.article === 'string'
        ? params.article
        : ''
      : '';
  const targetDir = path.join(process.cwd(), 'content', a);
  const dirs = await fs
    .readdirSync(targetDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const paths = [];
  for (const slug of dirs) {
    const article = getArticleBySlug(a, slug);
    paths.push({ title: article.title, path: slug, date: article.date });
  }
  paths.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  });
  return { props: { path: paths } };
};

const getArticleBySlug = (article: string, slug: string): Article => {
  // content/:type/slug/index.md
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
