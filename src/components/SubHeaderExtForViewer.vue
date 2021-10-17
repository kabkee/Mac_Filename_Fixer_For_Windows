<template>
    <div class="ml-3">
        <v-btn
            color="grey"
            class="mx-1"
            :disabled="!krpano"
            @click="resetKrpano()"
            >현재 파노라마 닫기</v-btn
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
            resetKrpano: "viewer/resetKrpano",
        }),
    },
};
</script>

<style></style>
