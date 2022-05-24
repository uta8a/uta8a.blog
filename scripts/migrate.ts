// use deno
import { parse } from "https://deno.land/x/frontmatter@v0.1.4/mod.ts";

// console.log(parse('---\ntitle: hoge\n---\nfuga\n## 1'))
// titleとdateのみ抜き出す
// index.mdをキャッチして_index.mdに書き出す
// まずはdiaryとpostに対して行う。_を先頭に足す

import { walk, walkSync } from "https://deno.land/std@0.140.0/fs/mod.ts";
import dayjs from 'https://cdn.skypack.dev/dayjs'; 
import utc from 'https://cdn.skypack.dev/dayjs/plugin/utc';
import timezone from 'https://cdn.skypack.dev/dayjs/plugin/timezone';
import { basename, dirname, join } from "https://deno.land/std@0.140.0/path/mod.ts";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo")

type BeforeFrontmatter = {
  date: string;
  title: string;
  type?: string;
  draft?: boolean;
}

type Parsed = {
  data: BeforeFrontmatter;
  content: string;
}
async function migrater() {
  for await (const entry of walk("content")) {
    const filename = entry.path;
    const name = `_${basename(filename)}`;
    if (name === '__index.md') continue;
    if (filename.slice(-3) === '.md') {
      console.log(filename);
      const raw = await Deno.readTextFile(filename);
      const parsed: Parsed = parse(raw) as Parsed;
      const contentType = parsed.data.type;
      const frontmatter = `---
layout: ${contentType}
title: ${parsed.data.title}
description: 
draft: false
changelog:
  - summary: 記事作成
    date: ${parsed.data.date}
  - summary: hugoにmigrate
    date: ${dayjs().tz().format() }
---\n\n`;
      
      const filepath = join(dirname(filename), name);
      await Deno.writeTextFile(filepath, frontmatter + parsed.content);
    }
  }
}

migrater().then(() => console.log("Done!"));

