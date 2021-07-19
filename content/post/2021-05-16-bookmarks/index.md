---
title: "週刊ブックマーク 5/14 - 6/28"
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
- [LocalStackに向けてTerraformを実行する](https://future-architect.github.io/articles/20201113/) [LocalStack](https://github.com/localstack/localstack) という、AWSの環境のローカル環境テストとして使えるエミュレーターのようなものとterraformの組み合わせについての記事
- [2020年の振り返りと次やりたいこと](https://shinyaigeek.dev/post/log-2020/) しにゃいさんの振り返り。開発でフロントエンドの再発明を行っている、babel/traverseでASTが扱えること(特にprefetchに関わりそうなので個人的にもCSS Animationに生かせそう)、WriteCodeEveryDayをしていることが参考になる。
- [IAM roleにおける、混乱した代理問題についての説明](https://qiita.com/hkak03key/items/a960b7523557f03bc098) 混乱した代理問題という、arnを推測してサービスに登録することで信頼関係も含めて完了している設定を適用して権限を得る問題へのExternalIDを利用した対策
- [banga/git-split-diffs](https://github.com/banga/git-split-diffs) git diffをGitHub styleでterminalから見れる。
- [より安全にご利用いただけるようになったClassiのご報告と今後の取り組みについて](https://corp.classi.jp/news/2416/) インシデントの検知からその後の対策までが書かれている。メルカリなど見ていると、GitHubには侵入されるという前提で考えた方がよい。
- [「何か質問や意見ありますか」の後の無言対策](https://konifar-zatsu.hatenadiary.jp/entry/2021/05/12/232722) 出席をとります、と背景の変更、とテキストチャットを使え、が参考になる
- [Googleの新しい分散型SDNコントローラー「Orion」（パート1）](https://www.school.ctc-g.co.jp/columns/nakai2/nakai2104.html) googleのデータセンターに導入された分散型SDNコントローラーOrionの紹介。JupyterとB4というネットワークシステムと、Orionのアーキテクチャの仕組みが説明されている。
