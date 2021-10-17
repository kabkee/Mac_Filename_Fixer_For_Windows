<template>
    <div>
        <v-app-bar app color="#999" dark>
            <div
                class="d-flex align-center"
                style="cursor: pointer"
                @click="onRouterPush('/')"
            >
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="@/assets/look360_favicon.png"
                    transition="scale-transition"
                    width="40"
                />

                <h3>Mac Filename Fixer For Windows {{ version }}</h3>
            </div>

            <v-spacer></v-spacer>
            <v-btn text to="/about"><v-icon>mdi-information-outline</v-icon> About</v-btn>

            <!-- <v-btn dark icon @click="drawer = !drawer">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
        </v-app-bar>

        <!-- <v-navigation-drawer v-model="drawer" fixed bottom right temporary>
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
        </v-navigation-drawer> -->
    </div>
</template>

<script>
var pjson = require("../../package.json");
console.log(pjson.version);

import { mapState, mapActions } from "vuex";
export default {
    data: () => ({
        drawer: false,
        version: pjson.version,
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
