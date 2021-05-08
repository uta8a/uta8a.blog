import { GetStaticProps } from 'next';
import React from 'react';
import path from 'path';
import fs from 'fs-extra';
import Link from 'next/link';
type Props = {
  path: string[];
};
export default function Home(props: Props): JSX.Element {
  return (
    <div>
      {props.path.map((e) => {
        return (
          <h1
            key={e}
            style={{
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              textAlign: 'center',
            }}
          >
            <Link href={`example/${e}`} passHref>
              <a>{e}</a>
            </Link>
          </h1>
        );
      })}
    </div>
  );
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const type = 'example';
  const targetDir = path.join(process.cwd(), 'content', type);
  const dirs = await fs.readdir(targetDir);
  return { props: { path: dirs } };
};
