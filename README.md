# Mac_Filename_Fixer_For_Windows

## 해결 문제

MacOs에서 Windows로 복사한 파일의 파일명이 자음 모음 분리현상(자소분리 현상)이 있는 경우, Windows에서 파일명을 알아보기 어려움 발생

## 해결방법

본 프로그램에 문제되는 해당 파일을 떨어뜨리면 파일명이 Windows 호환 파일명으로 변경 됨. 떨어뜨리는 동시에 파일명이 바뀜.
동시에 여러파일을 떨어뜨려도 모두 일괄 변경 됨.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Build Windows App on MacOS

```sh
docker run --rm -ti \
    --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
    --env ELECTRON_CACHE="/root/.cache/electron" \
    --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
    -v ${PWD}:/project \
    -v ${PWD##*/}-node-modules:/project/node_modules \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine
```
