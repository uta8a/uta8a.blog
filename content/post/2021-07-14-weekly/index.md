---
title: "(draft) 週刊ブックマーク 7/12 - 7/18"
type: "post"
draft: false
date: "2021-07-14T07:44:37+09:00"
---

## 記事
- [eshiho's Blog - Segment Tree](https://shiho-elliptic.tumblr.com/post/187841789319/segment-tree) elliptic shihoさんによるセグメント木の数学的な説明。
- [うさぎ小屋 - アセンブリ言語でlifegameを書いた](https://kimiyuki.net/blog/2016/01/07/lifegame-in-assembly/) kimiyukiさんによる記事。
- [hikalium/nv](https://github.com/hikalium/nv) hikaliumさんの書いたnv言語のコンパイラ。川合さんのEssenの仕様に基づいている([wiki](https://github.com/hikalium/nv/wiki)より) Plan9についての記述など、wikiから参考になりそうなものがありそう。
- [driftctlの紹介記事](https://zenn.dev/gosarami/articles/dd938001eac988e44d11) IaC化されていないAWSリソースの追跡を行うツール
- [Ruby on Rails学習ロードマップ](https://mitsuru53.github.io/ruby-roadmap/) スクール系の雰囲気が若干あるが、僕はこの記事は良い記事だと思う。かなり初心者向けのロードマップ。
- [Fuchsia development guide](https://fuchsia.dev/fuchsia-src/development) Google Nest Hubにも組み込まれているOS、Fuchsiaの開発ガイド。フクシャと読むらしい。
- [LLVM tutorial](https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html) KaleidoscopeというLLVMのチュートリアル。Kaleidoscopeは万華鏡という意味。
- [コンピュータサイエンスをより幅広い子どもたちへ](https://japan.googleblog.com/2021/06/CS-Education.html) STEAMはSTEMにArtを加えたもの。Science, Technology, Engineering, Mathematics, Artの5つ。記事を読む限りかなり女性のソフトウェアエンジニア育成に力をいれていると感じた。すごい。
- [Haskellで型レベルのCPUを定義してC Compilerを動かそうとする話](https://www.slideshare.net/SoheiYamaga/compile-time-type-level-c-compiler-this-may-indicate-out-of-memory) 大阪の大学のLTで発表された。ELVMを利用して型レベルCPUを作成したがメモリ不足だった(ELVMに最適化の余地がある)
- [pokemium/Worldwide](https://github.com/pokemium/Worldwide) GameBoy Color Emulator. Go製でebitenを使っているみたい。
- [containers/youki](https://github.com/containers/youki) Rust製のコンテナランタイム。
- [TFHE](https://tfhe.github.io/tfhe/) Fast Fully Homomorphic Encryption over the Torus 完全準同型暗号

## todo!
記事を読んで、これやりたいなと思ったアイデア集。実際に手を動かしてできるのはごく一部だけど面白そうという気持ちをメモっておくのが大事。

- 基本的なデータ構造に数学的な説明をつける。ここはCoqで証明するところが近そう。この前のIPSJ PROで確か計算量周りの証明を行っていた研究があったのでそのへんと合わせると数学的構造がある側面でバグってないことの保証に加えて計算量の保証もできそうで実用的な話になる。(証明つきコードの実現)
- アセンブリでlifegameを書く(befunge実装もあったのでesolangでもやってみたい) そもそもlifegameってどのくらいシンプルなんだろうか
- driftctlを使ってみる。記事がハンズオンになっていたのでやってみる。まだ発展途上のようなので、go製だしOSSコントリビュートチャンスかも
- Fuchsiaで遊ぶ。機能追加にチャレンジして内部構造を学びたい。moldでリンクするのもよさそう。
- Kaleidoscopeをする。LLVMフロントエンドは簡単に書いたことがあるがバックエンドはまだ触ったことがない。Inkwellを使うのもいいかも 参考になるかも: [Inkwellを使ってRustでLLVMをやっていく](https://cordx56.hatenablog.com/entry/2021/07/09/191006)
- 読んでみたいコード: pokemium/Worldwide, containers/youki
- 暗号は研究でもやる予定なので、[nindanaotoさんのシリーズ](https://qiita.com/nindanaoto/items/98335ad4d32b927effa9)を読んでいきたい。
