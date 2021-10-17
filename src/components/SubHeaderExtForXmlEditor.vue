<template>
    <div class="ml-3">
        <v-btn
            color="grey"
            disabled
            class="mx-1"
            @click="toggleNadirLogoDrawer()"
            >바닥로고 설정</v-btn
        >
        <v-btn
            :disabled="!krpano"
            color="grey"
            class="mx-1"
            @click="toggleMoveHotspotDrawer()"
            >이동핫스팟 설정</v-btn
        >
        <v-btn
            :disabled="!krpano"
            color="grey"
            class="mx-1"
            @click="saveJsonToXml()"
            >XML 저장</v-btn
        >
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
    data: () => ({
        drawer: false,
    }),
    computed: {
        ...mapState({
            krpano: (state) => state.viewer.krpano,
        }),
    },
    methods: {
        ...mapActions({
            resetKrpano: "viewer/resetKrpano",
            toggleNadirLogoDrawer: "viewer/toggleNadirLogoDrawer",
            toggleMoveHotspotDrawer: "viewer/toggleMoveHotspotDrawer",
            saveJsonToXml: "viewer/saveJsonToXml",
        }),
    },
};
</script>

<style></style>
