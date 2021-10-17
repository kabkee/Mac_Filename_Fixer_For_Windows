<template>
    <v-app>
        <MainHeader v-if="$route.path == '/'" />
        <SubHeader v-else />
        <v-main>
            <router-view />

            <v-snackbar
                v-if="snackbar"
                v-model="snackbar.isOpen"
                :timeout="snackbar.timeout"
                :color="snackbar.color"
                :vertical="snackbar.vertical"
            >
                <v-card-text v-html="snackbar.text"></v-card-text>

                <template v-slot:action="{ attrs }">
                    <v-btn
                        :color="snackbar.btnColor ? snackbar.btnColor : 'red'"
                        text
                        v-bind="attrs"
                        @click="snackbar.isOpen = false"
                    >
                        Close
                    </v-btn>
                </template></v-snackbar
            ></v-main
        >
        <v-dialog v-model="dialogLoading" persistent width="200">
            <v-card class="pa-4">
                <v-card-text class="pa-0 text-center">
                    <h3 class="loadingText">
                        <span class="plainText">기다리세요~ </span
                        ><CardsHeart />
                    </h3>

                    <div
                        v-if="dialogLoadingData.content"
                        style="margin: 1em 0;"
                    >
                        <div v-html="dialogLoadingData.content"></div>
                        <v-progress-linear
                            color="red lighten-2"
                            buffer-value="0"
                            :value="dialogLoadingData.progress"
                            stream
                        ></v-progress-linear>
                    </div>
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardsHeart from "vue-material-design-icons/CardsHeart.vue";
import MainHeader from "@/components/MainHeader.vue";
import SubHeader from "@/components/SubHeader.vue";

export default {
    name: "App",
    components: {
        CardsHeart,
        MainHeader,
        SubHeader,
    },
    props: {},
    data: () => ({
        drawer: false,
    }),
    mounted() {
        // setTimeout(() => {
        //     this.setDialogLoading(false);
        // }, 3000);
    },
    computed: {
        ...mapState({
            menu_main: (state) => state.common.menu_main,
            menu_maketour: (state) => state.common.menu_maketour,
            snackbar: (state) => state.common.snackbar,
            dialogLoading: (state) => state.common.dialogLoading,
            dialogLoadingData: (state) => state.common.dialogLoadingData,
        }),
    },
    methods: {
        ...mapActions({
            onRouterPush: "common/onRouterPush",
            setDialogLoading: "common/setDialogLoading",
            onClickMoveHotspotOnEditMode: "viewer/onClickMoveHotspotOnEditMode",
            onUpMoveHotspot: "viewer/onUpMoveHotspot",
            setOnDownMoveHotspot: "viewer/setOnDownMoveHotspot",
        }),
    },
};
</script>

<style scoped>
.loadingText > * {
    vertical-align: middle;
}
.loadingText > span.plainText {
    margin-bottom: 0.5em;
    display: inline-block;
}
</style>
