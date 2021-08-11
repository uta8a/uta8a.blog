import React from 'react';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div
      style={{
        paddingTop: '4rem',
        paddingLeft: '4rem',
        height: '100%',
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
      <Link href={'/post'} passHref>
        <a>
          <h1
            style={{
              paddingBottom: '2rem',
            }}
          >
            /post - 技術的な内容
          </h1>
        </a>
      </Link>
      <Link href={'/diary'} passHref>
        <a>
          <h1
            style={{
              paddingBottom: '2rem',
            }}
          >
            /diary - 個人的な日記
          </h1>
        </a>
      </Link>
      <details
        style={{
          bottom: '1rem',
        }}
      >
        <summary>License表示</summary>
        <div>
          <div>
            <a href="https://github.com/zenn-dev/zenn-editor">
              zenn-dev/zenn-editor
            </a>{' '}
            以下のzenn-markdown-html、zenn-content-css、zenn-embed-elementsを使用しています。
          </div>
          <div>Copyright (c) 2021 CatNose</div>
          <div>Released under the MIT license</div>
          それ以外の私が書いた部分についてはソースコードはMITライセンス、文章はCC
          BY-NC-ND 4.0です。
          <div>Copyright (c) 2021 uta8a</div>
          <div>Released under the MIT license</div>
          <div>Released under CC BY-NC-ND 4.0</div>
        </div>
      </details>
    </div>
  );
}
