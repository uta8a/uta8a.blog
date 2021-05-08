#!/bin/sh
set -ue

mkdir -p $1
touch $1/index.md
cat << FRONT > $1/index.md
---
title: "$1"
type: "example"
draft: false
date: "$(date -I'seconds')"
---
FRONT

# ---
# date: "${date -I'seconds'}"
# title: "$1"
# type: "example"
# draft: false
# ---
