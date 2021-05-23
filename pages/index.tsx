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
    <div
      style={{
        paddingTop: '4rem',
        paddingLeft: '4rem',
      }}
    >
      <h1
        style={{
          paddingBottom: '2rem',
          fontSize: '3rem',
        }}
      >
        diaryです
      </h1>
      <Link href={'post/'} passHref>
        <h1
          style={{
            paddingBottom: '2rem',
          }}
        >
          /post - 技術的な内容
        </h1>
      </Link>
      <Link href={'diary/'} passHref>
        <h1
          style={{
            paddingBottom: '2rem',
          }}
        >
          /diary - 個人的な日記
        </h1>
      </Link>
    </div>
  );
}
