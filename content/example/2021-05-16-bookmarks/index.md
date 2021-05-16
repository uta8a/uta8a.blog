---
title: "Weekly Bookmarks 5/14 - 5/20"
type: "example"
draft: false
date: "2021-05-16T09:23:46+09:00"
---

今週は--でした。

## その他
- [絵文字をファビコンとして表示する簡単な方法](https://zenn.dev/catnose99/articles/3d2f439e8ed161) 個人開発で絵文字がvercelの三角形になりがちな人におすすめ。仕組みはSVGをファビコンに指定できるので、テキストをSVGに埋め込めばいけるという話。
- [GraphQL IDE の “GraphiQL” をカスタマイズして、開発ツールとして活用する](https://developer.hatenastaff.com/entry/2021/05/14/093000) 読み方は"ぐらふぃくる"らしい。GraphQLのクライアントをカスタマイズしてデバッグ時に使うpresetなどをツールバーからぽちっとするだけで初期クエリを生成できるようにしている。
- [locateとupdatedb](http://www.sooota.com/locate%E3%81%A8updatedb/) mlocateパッケージとupdatedbコマンドを用いて、例えば docker-composeでupしたままrestart:alwaysにしてしまったがどのフォルダで立ち上げたかわからないときに、以下のように検索を掛けられる。findを何度も回すよりも一回DB作ってからの方が速い。updatedbはcronで回すとよい。

```shell
updatedb # DBアップデート 時間かかる
locate -r "/.terraform$" # r - regex
locate -r "docker-compose*" # match docker-compose.dev.yml, ...
```

- []
