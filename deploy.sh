#!/usr/bin/env sh

set -e

#build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m "deploy with vuepress"

git push -f https://github.com/tjddus/HwangKim_site master:gh-pages

cd -