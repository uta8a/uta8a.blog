---
title: "2021/05/09 - Weekly"
type: "example"
draft: false
date: "2021-05-09T07:01:45+09:00"
---

記事を読んだ記録や小さなメモ。

## TypeScript
[TypeScript 練習問題集](https://gist.github.com/kenmori/8cea4b82dd12ad31f565721c9c456662) と積んでいる [type-challege](https://github.com/type-challenges/type-challenges) をしないとなあという気持ちに。

このブログは [zenn-dev/zenn-editor](https://github.com/zenn-dev/zenn-editor) をかなり参考にしていて、その過程でanyを潰していたらJSON周りと型周りでつらかった。

[tkr](https://twitter.com/kgtkr)さんに教えてもらったこと:
- [io-ts](https://github.com/gcanti/io-ts)がJSONを扱う上で役立つ
- 以下のようにしてUnionからArrayに変換できる
```ts:sample.ts
const _dummy = { a: null, b: null, c: null }
type Union = keyof typeof _dummy
const unionArray = Object.keys(_dummy) as Union[]; // ["a", "b", "c"] 
```
後はRustの気持ちになるとnull, undefinedなどがつらかった。気持ち的にOption, Resultが欲しい。ちょっと調べると [fp-ts](https://github.com/gcanti/fp-ts) がよさそう。

## rustcraft
[dskart/rustcraft](https://github.com/dskart/rustcraft) を知った。Rustのwgpuクレート(icedでも内部的に使われている低レイヤなクレート)を用いてminecraftっぽい見た目のゲームを実装。動けたりブロックを破壊できるらしい。アイテムとか細かいところはなくてほんとに基本のみ。
