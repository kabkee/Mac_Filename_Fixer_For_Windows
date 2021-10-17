<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="isOpenModalForSelectScene"
                persistent
                fullscreen
                scrollable
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5">이동핫스팟 이동 Scene 선택</span>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-container>
                            <v-list subheader>
                                <!-- <v-subheader>Recent chat</v-subheader> -->
                                <v-hover
                                    v-slot="{ hover }"
                                    open-delay="50"
                                    v-for="scene in scenes"
                                    :key="scene.name"
                                >
                                    <v-list-item
                                        class="listItem"
                                        :class="hover ? 'active' : ''"
                                        @click="onClickSceneList(scene)"
                                    >
                                        <v-img
                                            :alt="`${scene.name}`"
                                            :src="_sterallizeThumbUrl(scene.thumburl)"
                                            style="max-width: 150px; margin-right: 1em;"
                                        ></v-img>

                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="scene.name"
                                            ></v-list-item-title>
                                        </v-list-item-content>

                                        <v-list-item-icon>
                                            <v-icon
                                                :color="
                                                    hover ? 'green' : 'grey'
                                                "
                                            >
                                                mdi-check-bold
                                            </v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-hover>
                            </v-list>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="setIsOpenModalForSelectScene(false)"
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
const path = require("path");
export default {
    data: () => ({
        modalForDestView: false,
    }),
    computed: {
        ...mapState({
            krpano: (state) => state.viewer.krpano,
            isOpenModalForSelectScene: (state) =>
                state.viewer.isOpenModalForSelectScene,
        }),
        scenes() {
            if (this.krpano) {
                let scenes = this.krpano.get("scene").getArray();
                return scenes;
            }
        },
    },
    mounted() {},
    methods: {
        ...mapActions({
            resetKrpano: "viewer/resetKrpano",
            toggleNadirLogoDrawer: "viewer/toggleNadirLogoDrawer",
            toggleMoveHotspotDrawer: "viewer/toggleMoveHotspotDrawer",
            saveJsonToXml: "viewer/saveJsonToXml",
            setIsOpenModalForSelectScene: "viewer/setIsOpenModalForSelectScene",
            setIsOpenModalForDestView: "viewer/setIsOpenModalForDestView",
            setSelectedScene: "viewer/setSelectedScene",
        }),
        _sterallizeThumbUrl(url){
            url = url.replace(/\//g, path.sep);
            if(url.indexOf('safe-file-protocol:\\\\') != -1){
                url = url.replace(/safe-file-protocol:\\\\/g, 'safe-file-protocol:\/\/');
            }
            // if(url.indexOf('\\') != -1){
            //     let splitUrl = url.split('\\');
            //     for(let key in splitUrl){
            //         if(splitUrl[key].indexOf(' ') != -1){
            //             splitUrl[key] = `'${splitUrl[key]}'`;
            //         }
            //     }
            //     url = splitUrl.join('\\');
            // }
            // console.info('replaced Url',encodeURI(url))
            return encodeURI(url);
        },
        onClickSceneList(scene) {
            this.setIsOpenModalForSelectScene(false);
            this.setIsOpenModalForDestView(true);
            this.setSelectedScene(scene.name);
        },
    },
};
</script>

<style scoped>
.listItem {
    margin: 0.5em 0;
    padding-left: 0;
    cursor: pointer;
}
.listItem.active {
    box-shadow: 2px 2px 10px #aaa;
}
</style>
