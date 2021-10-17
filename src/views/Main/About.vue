<template>
    <div class="about">
        <v-container>
            <h1>해결 문제</h1>
            <p>
                MacOs에서 Windows로 복사한 파일의 파일명이 자음 모음
                분리현상(자소분리 현상)이 있는 경우, Windows에서 파일명을
                알아보기 어려움 발생
            </p>
            <h1>해결방법</h1>
            <p>
                본 프로그램에 문제되는 해당 파일을 떨어뜨리면 파일명이 Windows
                호환 파일명으로 변경 됨. 떨어뜨리는 동시에 파일명이 바뀜.
            </p>
            <p>
                동시에 여러파일을 떨어뜨려도 모두 일괄 변경 됨.
            </p>
        </v-container>
    </div>
</template>

<style scoped>
h1 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
p {
    padding-left: 1rem;
}
</style>
