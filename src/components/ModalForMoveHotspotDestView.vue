<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="isOpenModalForDestView"
                persistent
                fullscreen
                scrollable
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5">이동 후, Scene View 설정</span>
                        <v-spacer></v-spacer>
                        <v-btn color="" class="mr-3" @click="onClickVZero()"
                            >V=0</v-btn
                        >
                        <v-btn color="" class="mr-3" @click="onClickLookBack()"
                            >뒤돌기</v-btn
                        >
                        <v-btn
                            color=""
                            class="mr-3"
                            @click="toggleCrossLayers(localKrpano)"
                            >십자 보이기/숨기기</v-btn
                        >
                        <v-btn
                            color="light-blue"
                            class="white--text"
                            @click="onClickSetDone()"
                            >설정</v-btn
                        >
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-container
                            style="padding: 0; height: calc(100vh - 115px);"
                        >
                            <div id="pano_destview" />
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="setIsOpenModalForDestView(false)"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data: () => ({
        modalForDestView: false,
        localKrpano: null,
    }),
    computed: {
        ...mapState({
            krpano: (state) => state.viewer.krpano,
            xmlPath: (state) => state.viewer.xmlPath,
            selectedScene: (state) => state.viewer.selectedScene,
            selectedMoveHotspotName: (state) =>
                state.viewer.selectedMoveHotspotName,
            isOpenModalForDestView: (state) =>
                state.viewer.isOpenModalForDestView,
        }),
        scenes() {
            if (this.krpano) {
                let scenes = this.krpano.get("scene").getArray();
                return scenes;
            }
        },
    },
    mounted() {
        if (this.selectedScene) {
            embedpano({
                xml: `safe-file-protocol://${this.xmlPath}`,
                target: "pano_destview",
                id: "vr_destview",
                html5: "prefer",
                mobilescale: 1.0,
                initvars: { editor: 0 },
                passQueryParameters: true,
                localfallback: "safe-file-protocol://",
                onready: this.onReadyKrpano,
            });
        }
    },
    methods: {
        ...mapActions({
            setIsOpenModalForDestView: "viewer/setIsOpenModalForDestView",
            addCrossLayers: "viewer/addCrossLayers",
            updateHotspot: "viewer/updateHotspot",
            toggleCrossLayers: "viewer/toggleCrossLayers",
        }),
        onReadyKrpano(krpano) {
            this.localKrpano = krpano;

            setTimeout(() => {
                krpano.call(`loadscene(${this.selectedScene})`);
                krpano
                    .get("hotspot")
                    .getArray()
                    .forEach((element) => {
                        element.alpha = 0;
                        element.visible = false;
                    });
                krpano
                    .get("layer")
                    .getArray()
                    .forEach((element) => {
                        element.alpha = 0;
                        element.visible = false;
                    });

                this.addCrossLayers(krpano);
            }, 250);
        },
        onClickSceneList(scene) {
            this.setIsOpenModalForSelectScene(false);
            this.setIsOpenModalForDestView(true);
            this.setSelectedScene(scene.name);
        },
        onClickSetDone() {
            const linkedscene_lookat = `${this.localKrpano.get(
                "view.hlookat"
            )},${this.localKrpano.get("view.vlookat")},${this.krpano.get(
                "view.fov"
            )}`;
            const linkedscene = this.localKrpano.get("xml.scene");

            this.krpano.set(
                `hotspot[${this.selectedMoveHotspotName}].linkedscene_lookat`,
                linkedscene_lookat
            );
            this.krpano.set(
                `hotspot[${this.selectedMoveHotspotName}].linkedscene`,
                linkedscene
            );
            this.updateHotspot({
                _name: this.selectedMoveHotspotName,
                _linkedscene_lookat: linkedscene_lookat,
                _linkedscene: linkedscene,
            });
            this.setIsOpenModalForDestView(false);
        },
        onClickLookBack() {
            let newH = this.localKrpano.get("view.hlookat") + 180;
            this.localKrpano.call(`lookto(${newH}, get(view.vlookat))`);
        },
        onClickVZero() {
            this.localKrpano.set(`view.vlookat`, 0);
        },
    },
};
</script>

<style scoped>
.listItem {
    margin: 0.5em 0;
    padding-left: 0;
}
.listItem.active {
    box-shadow: 2px 2px 10px #aaa;
}
#pano_destview {
    height: 100%;
}
</style>
