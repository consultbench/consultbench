#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${PAGES_REPO_URL:-https://github.com/consultbench/consultbench.git}"
BASE_PATH="${NEXT_PUBLIC_SITE_BASE_PATH:-/consultbench}"
DEPLOY_DIR="${TMPDIR:-/tmp}/consultbench-gh-pages"

export NEXT_PUBLIC_SITE_BASE_PATH="$BASE_PATH"

npm run build

rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -R out/. "$DEPLOY_DIR/"

git -C "$DEPLOY_DIR" init -b gh-pages
git -C "$DEPLOY_DIR" config user.name "ConsultBench"
git -C "$DEPLOY_DIR" config user.email "noreply@consultbench.github.io"
git -C "$DEPLOY_DIR" remote add origin "$REPO_URL"
git -C "$DEPLOY_DIR" add -A
git -C "$DEPLOY_DIR" commit -m "Deploy ConsultBench site"
git -C "$DEPLOY_DIR" push -f origin gh-pages

echo "Published GitHub Pages to $REPO_URL"
