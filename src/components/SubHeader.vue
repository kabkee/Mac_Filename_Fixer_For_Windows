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
            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    components: {},
    data: () => ({
        drawer: false,
    }),
    computed: {
        ...mapState({
            menu_main: (state) => state.common.menu_main,
            menu_maketour: (state) => state.common.menu_maketour,
        }),
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
