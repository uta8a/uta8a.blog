---
title: "content/example/2021-05-16-rust-cli"
type: "example"
draft: false
date: "2021-05-16T09:23:37+09:00"
---

競技プログラミングを再開しようとして、Rustでディレクトリをつくるのがめんどくさいことに気づきました。 `mkdir -p` のようなCLIツールを作ったときに学んだメモです。

## [StructOpt](https://github.com/TeXitoi/structopt) で引数パース
Rustのコマンドライン引数パーサというと、[clap](https://github.com/clap-rs/clap)が有名だが、最近はStructOptもよく見かけるのでこちらを使った。今調べたところ、StructOptはclap v2.33に依存しているらしい。
以下のように、コマンドライン引数をstructへ変換する。引数からstructのメンバへの変換時のvalidationは、parseする関数を指定できて、今回は `parse_mydir_rule` という関数を作ってそれを指定している。

```rust:main.rs
#[derive(StructOpt, Debug)]
#[structopt(name = "pdir")]
struct Opt {
    #[structopt(short)]
    atcoder: bool,
    /// Each directory
    #[structopt(name = "DIR", parse(try_from_str = parse_mydir_rule))]
    dirs: Vec<String>,
}
fn main() {
    let opt = Opt::from_args();
    println!("{:#?}", opt);
}
```

## [OnceCell](https://github.com/matklad/once_cell) で初期化処理
初期化処理を行いstaticなglobal変数を作る方法として、 [lazy_static](https://github.com/rust-lang-nursery/lazy-static.rs) が有名だが、最近はOnceCellも使われている。
今回は、ファイル名を数字アルファベット大文字小文字、ハイフン、アンダーバー、ドットのみに制限したかったのでregexクレートを使ったが、このとき毎回Regexを生成しているのかよく分からず、初期化したとき一度だけ計算するようにしたくて使った。

```rust:main.rs
use regex::Regex;
use once_cell::sync::Lazy;

static DIR_REGEX: Lazy<Regex> = Lazy::new(|| Regex::new("[a-zA-Z0-9-_\\.]+").unwrap());
```

## [cargo workspaces](https://doc.rust-jp.rs/book-ja/ch14-03-cargo-workspaces.html) で管理する
競技プログラミングではrustcコマンドで直接やっていたが、VSCodeとの相性やcargoに乗っかりたい気持ちから各A~F問題をそれぞれ `main.rs` で書きたいと考え、workspacesを使うことにした。
今回使った特徴は、workspace全体を設定するディレクトリから各ディレクトリの `main.rs` が実行できる機能です。
以下のようなディレクトリ構成で、 `atcoder/abcXYZ/` で `cargo run -p a` とすると、 `a` ディレクトリで `cargo run` したのと同じことができて、 `target` ディレクトリは `abcXYZ/` ディレクトリにしか生成されません。
また、runは `r` のエイリアスがあるので、Makefileなどで `make a` として `cargo r -p a` のようにすることも可能です。
今回作成したpdirでは、 `pdir atcoder abcXYZ -a` というコマンドで `atcoder/abcXYZ/a/, ...`が生成されるようにしています。

```shell
atcoder/abcXYZ/
├── a
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── b
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── c
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── Cargo.lock
├── Cargo.toml # workspaces
├── d
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── e
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── f
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

```toml:Cargo.toml
[workspace]
members = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
]
```

## 文字列のconcatはjoinを使おう
文字列の連結は、引数のスペース区切りの単語を `/` で連結するようにした。

```rust
let path = opt.dirs.join("/");
let path = path.as_str();

[path, "Cargo.toml"].join("/"); // a/b/c/Cargo.toml
```

## 文字列の扱いが難しい
上のjoinのところで、以下のようにするとだめになりました。やりたいことは、Stringだと使い回せないので&strにして使いまわそうということです。
エラーメッセージもまだ借用きちんと理解できてなくて分からない感じなので、いい方法があれば知りたいです。

```rust
let path = opt.dirs.join("/").as_str();
```

最小の再現コードです
https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=9b7aa9be5339c8c3b1c8373fefa8700f

```text
error[E0716]: temporary value dropped while borrowed
 --> src/main.rs:4:14
  |
4 |     let st = ["a", "b", "c"].join("/").as_str();
  |              ^^^^^^^^^^^^^^^^^^^^^^^^^         - temporary value is freed at the end of this statement
  |              |
  |              creates a temporary which is freed while still in use
5 |     println!("{}", st);
  |                    -- borrow later used here
  |
  = note: consider using a `let` binding to create a longer lived value
```


## anyhowとthiserrorの組み合わせが分からない
anyhowのResultを返す関数で、thiserrorを使ったenumでエラーを返そうとしたら、それはanyhowのエラー型ではありませんよと言われた。結局 `Err(anyhow!("message"))` としたが、thiserrorでエラーメッセージとエラー型を一括管理できる恩恵を受けたいときに微妙になってしまう。ドキュメントを見てもよく分からなかったので、使われている例を探したい。

## Commandが便利
下のように、コマンドオプションがオンになっていたら、ディレクトリを `cargo` を流して作成し、workspaceのところは直接ファイルを生成するようにした。個人的にわかりやすいコマンド体系で、変数を直接入れることは危険なため避けるが、こういう固定のコマンド発行のときは使っていくつもり。

```rust:main.rs
use std::process::Command;

if opt.atcoder {
    // cargo new a..f
    for ch in 'a'..='f' {
        Command::new("cargo")
            .args(&["new", "--bin", ch.to_string().as_str()])
            .current_dir(path).output()?;
    }
    // make Cargo.toml (workspace)
    let mut file = fs::File::create([path, "Cargo.toml"].join("/"))?;
    let content = r###"[workspace]
members = [
"a",
"b",
"c",
"d",
"e",
"f",
]"###;
    write!(file, "{}", content)?;
    file.flush()?;
}
```

