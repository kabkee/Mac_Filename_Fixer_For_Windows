<template>
    <v-navigation-drawer
        :style="`width: ${sideDrawerWidth}px`"
        absolute
        permanent
        right
    >
        <template v-slot:prepend>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-subtitle>이동핫스팟 설정</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item>
                <v-btn style="width:100%" @click="addMoveHotspot()">추가</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn
                    style="width:100%"
                    @click="toggleIsMoveHotspotEditModeOn()"
                >
                    <v-badge
                        v-if="isMoveHotspotEditModeOn"
                        style="width:100%"
                        content="ON"
                        value="ON"
                        color="green"
                        bordered
                    >
                        <span>편집</span>
                    </v-badge>
                    <span v-else>편집</span>
                </v-btn>
            </v-list-item>
            <v-list-item v-show="onDownMoveHotspot">
                <v-btn style="width:100%" @click="removeMoveHotspot()">
                    <span
                        ><span style="font-size: 0.5em">{{
                            onDownMoveHotspot
                        }}</span>
                        삭제</span
                    >
                </v-btn>
            </v-list-item>
            <v-divider class="my-4" />
            <v-list-item v-if="isMoveHotspotEditModeOn">
                <v-btn style="width:50%" @click="addBeforeLookto()">
                    <span>이동전 바라보기</span>
                </v-btn>
                <v-btn style="width:50%" @click="deleteBeforeLookto()">
                    <span>바라보기 삭제</span>
                </v-btn>
            </v-list-item>
            <v-list-item v-if="isMoveHotspotEditModeOn">
                <v-btn style="width:100%" @click="toggleCrossLayers(krpano)">
                    <span>십자 보이기/숨기기</span>
                </v-btn>
            </v-list-item>
            <v-list-item v-if="isMoveHotspotEditModeOn">
                <v-btn style="width:100%" @click="onClickLookBack()">
                    <span>뒤돌기</span>
                </v-btn>
            </v-list-item>
            <v-list-item v-if="isMoveHotspotEditModeOn">
                <v-btn style="width:100%" @click="onClickVZero()">
                    <span>V=0</span>
                </v-btn>
            </v-list-item>
            <!-- <v-list-item>
                <v-list-item-content>
                    <v-list-item-title><v-btn>편집</v-btn></v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    props: {
        sideDrawerWidth: {
            type: Number,
            required: true,
        },
    },
    mounted() {},
    computed: {
        ...mapState({
            krpano: (state) => state.viewer.krpano,
            onDownMoveHotspot: (state) => state.viewer.onDownMoveHotspot,
            isMoveHotspotEditModeOn: (state) =>
                state.viewer.isMoveHotspotEditModeOn,
        }),
    },
    watch: {
        isMoveHotspotEditModeOn(val) {
            if (val) {
                if (!this.krpano.get("layer[barhrz]")) {
                    this.addCrossLayers(this.krpano);
                }
            }
            this.setCrossLayers({ krpano: this.krpano, value: val });
        },
    },
    methods: {
        ...mapActions({
            setKrpano: "viewer/setKrpano",
            setKrpanoElement: "viewer/setKrpanoElement",
            addMoveHotspot: "viewer/addMoveHotspot",
            removeMoveHotspot: "viewer/removeMoveHotspot",
            setOnDownMoveHotspot: "viewer/setOnDownMoveHotspot",
            toggleIsMoveHotspotEditModeOn:
                "viewer/toggleIsMoveHotspotEditModeOn",
            addCrossLayers: "viewer/addCrossLayers",
            setCrossLayers: "viewer/setCrossLayers",
            toggleCrossLayers: "viewer/toggleCrossLayers",
            addBeforeLookto: "viewer/addBeforeLookto",
            deleteBeforeLookto: "viewer/deleteBeforeLookto",
        }),
        onClickLookBack() {
            let newH = this.krpano.get("view.hlookat") + 180;
            this.krpano.call(`lookto(${newH}, get(view.vlookat))`);
        },
        onClickVZero() {
            this.krpano.set(`view.vlookat`, 0);
        },
    },
};
</script>

<style></style>
