---
title: "[draft] 誰かのコードを読んで学ぶ / mazrean/separated-webshell"
type: "post"
draft: false
date: "2021-05-26T19:49:01+09:00"
---

人のコードを読んでいいところを学んでいこうと思います。traPのtraQ, NeoShowcase, camphor-のrelaymあたりは読んでいきたいです。
今回は、色々見て回って[mazrean/separated-webshell](https://github.com/mazrean/separated-webshell)がよさそうだと感じたので読みます。

# # 前提条件
- repository: [https://github.com/mazrean/separated-webshell](https://github.com/mazrean/separated-webshell)
- 2021/05/26時点での`main`ブランチの最新を対象とします。(commit hash: `5c3e14c32cc5582e9768467f02d22217ac1b6759`)
- ソースコードの解説というより、僕が知らなかったことを解説するみたいな方針でブログに残します(ソースコードの解説は製作者にしかできないので)

# # コードを読む
## ## 概要
おそらく、[CPCTFを支えたインフラ](https://trap.jp/post/1303/)で紹介されている、Webshellの中で動いているssh-separatorがこれに当たると思われます。CTFで使うために、SSHした先を各コンテナに振り分けているようです。
記事では、

> また、日付は決まっていませんがWebshellについてのブログ記事も出る予定なのでお楽しみに！

とあるので、traPブログで解説が出るのを楽しみにしています。

## ## CI/CD
GitHub Actionsを使用していて、Lintを走らせて報告させる`main.yml`, tagを打ったときにreleaseする`release.yml`の2つが走ります。

## `main.yml`
mod, build, lintの3つのJobが実行されます。

> A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run jobs sequentially, you can define dependencies on other jobs using the jobs.<job_id>.needs keyword.
> **ref.** https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

なので、これらのJobはmodが実行された後、`needs`が書かれているbuild, lintが並列に動作します。

### actions/cache@v2
再利用できる依存関係などのファイルをキャッシュするために使う。このリポジトリでは、modでgoの外部ライブラリをキャッシュさせた後、build, lintで使用している。
使い方は、Goの場合は[actions/cacheのGoのexample](https://github.com/actions/cache/blob/main/examples.md#go---modules)を見て、[GitHub Docs > 依存関係をキャッシュしてワークフローのスピードを上げる](https://docs.github.com/ja/actions/guides/caching-dependencies-to-speed-up-workflows)を見ておけばよさそう。

### actions/upload-artifact@v2
CI上でテストの結果をHTMLに出力してどこかに持っていきたいときや、生成物をダウンロードしたいときにGitHub側に一時的に保存することができるAction。
[GitHub Docs > ワークフロー データを成果物として保存する](https://docs.github.com/ja/actions/guides/storing-workflow-data-as-artifacts)や、[actions/upload-artifact](https://github.com/actions/upload-artifact)を見ておけばよさそう。
成果物は、GitHubのActionsタブから個別のページに行くと誰でもダウンロード可能。なので、credentialはartifactに含めてはいけない。

### システムパスの追加
https://docs.github.com/ja/actions/reference/workflow-commands-for-github-actions#adding-a-system-path
ここにあるように、`$GITHUB_PATH`に追記するとPATHを追加できる。

### reviewdog
[reviewdog](https://github.com/reviewdog/reviewdog)は様々な言語、linterに対応している結果をプルリクに通知してくれるツール

### golangci-lint
[golangci-lint](https://github.com/golangci/golangci-lint)はlinter集。あくまでlinter集なので、どのlinterを使っているのか？という話が重要そう。
このリポジトリでは、[.golangci.yml](https://github.com/mazrean/separated-webshell/blob/main/.golangci.yml)で決められているので見ていく。
合わせて、[Go公式のlinter、Golintが非推奨になった](https://zenn.dev/sanpo_shiho/articles/09d1da9af91998)と[golangci-lint Enabled By Default Linters](https://golangci-lint.run/usage/linters/#enabled-by-default-linters)を読んだ。

- golangci-lintでデフォルトでONになっているもの: govet, errcheck, staticcheck, unused, gosimple, structcheck, varcheck, ineffassign, deadcode, typecheck
- deprecated: golint
- golangci-lintでデフォルトでOFFになっているもの: gofmt

このあたりは開発者の好みもありそう。
その他眺めてたら、以下2つが面白そうだと感じた。

- [misspell](https://github.com/client9/misspell): 変数名英語のスペルミスチェック(ただし最終リリースが2018年)
- [wastedassign](https://github.com/sanposhiho/wastedassign): 意味のない代入を報告

## `release.yml`
(draft)

## ## 使っているライブラリ
(draft)

## ## コード本体
(draft)

# # 最後に
やっぱり強い人の手頃な大きさのリポジトリを読んで公式ドキュメントと照らし合わせて勉強していくの参考になる〜
公開してくれていることに感謝です🙏
(draft)
