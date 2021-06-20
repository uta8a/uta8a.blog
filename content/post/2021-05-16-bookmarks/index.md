---
title: "週間ブックマーク 5/14 - 6/21"
type: "post"
draft: false
date: "2021-05-16T09:23:46+09:00"
---

- [絵文字をファビコンとして表示する簡単な方法](https://zenn.dev/catnose99/articles/3d2f439e8ed161) 仕組みはSVGをファビコンに指定できるので、テキストをSVGに埋め込めばいけるという話。個人的に、開発でfaviconがvercelの三角形になりがちなのでこういう手軽さはよいと思った。
- [GraphQL IDE の “GraphiQL” をカスタマイズして、開発ツールとして活用する](https://developer.hatenastaff.com/entry/2021/05/14/093000) 読み方は"ぐらふぃくる"らしい。GraphQLのクライアントをカスタマイズしてデバッグ時に使うpresetなどをツールバーからぽちっとするだけで初期クエリを生成できるようにしている。
- [locateとupdatedb](http://www.sooota.com/locate%E3%81%A8updatedb/) mlocateパッケージとupdatedbコマンドを用いて、例えば docker-composeでupしたままrestart:alwaysにしてしまったがどのフォルダで立ち上げたかわからないときに、以下のように検索を掛けられる。findを何度も回すよりも一回DB作ってからの方が速い。updatedbはcronで回すとよい。

```shell
updatedb # DBアップデート 時間かかる
locate -r "/.terraform$" # r - regex
locate -r "docker-compose*" # match docker-compose.dev.yml, ...
```

- [A Deep Dive Into V8](https://blog.appsignal.com/2020/07/01/a-deep-dive-into-v8.html) V8ではコンパイル、GCの過程、シングルスレッドがポイントになる。 v5.9(2017)ではIgnitionコンパイラがTurbofanになっている。動的言語は実行中にオブジェクトが書き換わるので、allocateする領域をどのくらいとればいいのか分からず困る。例示としてHiddenClassの話が出た。
- [WebRTCを今から学ぶ人に向けて](https://zenn.dev/voluntas/scraps/82b9e111f43ab3) 用語の意味が分かってから勉強すると早い。トラブル解析や負荷試験、コーデックにも触れられている。
- []
