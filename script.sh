#!/bin/sh
set -ue

if [ "$(uname)" == "Darwin" ]; then
  DATE="$(gdate --iso-8601=sec)"
else
  DATE="$(date -I'seconds')"
fi

mkdir -p $1
touch $1/index.md
cat << FRONT > $1/index.md
---
title: "$1"
type: "example"
draft: false
date: "$DATE"
---
FRONT

# ---
# date: "${date -I'seconds'}"
# title: "$1"
# type: "example"
# draft: false
# ---
