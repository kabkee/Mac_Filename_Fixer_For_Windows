<template>
    <div>
        <v-app-bar app color="#999" dark>
            <v-btn
                icon
                class="d-flex align-center"
                style="cursor: pointer"
                @click="$router.back()"
            >
                <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <div>
                <SubHeaderExtForSetting v-if="$route.path == '/setting'" />
                <SubHeaderExtForXmlEditor v-if="$route.path == '/xmleditor'" />
                <SubHeaderExtForViewer v-if="$route.path == '/panoviewer'" />
            </div>
            <v-spacer></v-spacer>
            <!-- <v-btn text to="/setting"><v-icon>mdi-cog</v-icon> 설정 </v-btn> -->

            <v-btn dark icon @click="drawer = !drawer">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed bottom right temporary>
            <v-list v-for="(item, i) in items" :key="i">
                <v-subheader v-if="item.title">{{ item.title }}</v-subheader>
                <v-list-item
                    v-for="(lItem, itemIdx) in item.items"
                    :key="itemIdx"
                >
                    <v-btn text @click="onRouterPush(lItem.to)">
                        <v-list-item-title
                            ><span v-if="item.title">{{ itemIdx + 1 }}.</span>
                            {{ lItem.title }}</v-list-item-title
                        >
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SubHeaderExtForXmlEditor from "@/components/SubHeaderExtForXmlEditor.vue";
import SubHeaderExtForViewer from "@/components/SubHeaderExtForViewer.vue";
import SubHeaderExtForSetting from "@/components/SubHeaderExtForSetting.vue";

export default {
    components: {
        SubHeaderExtForXmlEditor,
        SubHeaderExtForViewer,
        SubHeaderExtForSetting,
    },
    data: () => ({
        drawer: false,
    }),
    computed: {
        ...mapState({
            menu_main: (state) => state.common.menu_main,
            menu_maketour: (state) => state.common.menu_maketour,
        }),
        items() {
            return [
                {
                    items: [
                        {
                            title: "HOME",
                            to: "/",
                        },
                    ],
                },
                { title: "메인메뉴", items: this.menu_main },
                { title: "투어메뉴", items: this.menu_maketour },
                {
                    items: [
                        {
                            title: "SETTING",
                            to: "/setting",
                        },
                    ],
                },
            ];
        },
    },
    methods: {
        ...mapActions({
            onRouterPush: "common/onRouterPush",
            setDialogLoading: "common/setDialogLoading",
        }),
    },
};
</script>

<style></style>
