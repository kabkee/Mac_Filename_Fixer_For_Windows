<template>
    <div class="ml-3">
        <v-btn color="pink" class="white__text mx-1" @click="saveLocalEnv()"
            >저장</v-btn
        >
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data: () => ({}),
    computed: {
        ...mapState({
            krpano: (state) => state.viewer.krpano,
        }),
    },
    methods: {
        ...mapActions({
            saveLocalEnv: "localFileEnv/saveLocalEnv",
        }),
    },
};
</script>

<style></style>
