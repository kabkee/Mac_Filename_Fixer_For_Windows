<template>
    <div>
        <v-text-field
            v-show="false"
            v-model="projectMotherFolder"
            label="폴더 위치"
            clearable
            @change="onChangeProjectMotherFolder"
        ></v-text-field>
        <v-btn class="mx-2" @click="onClickSelectFolder"
            >폴더 {{ projectMotherFolder ? "변경" : "" }} 선택</v-btn
        >
        <v-btn
            class="mx-2"
            v-show="projectMotherFolder"
            @click="onClickOpenMotherFolder"
            >폴더 열기</v-btn
        >
        <v-btn class="mx-2" to="/folder_name_changer"
            >폴더명 변경하러 가기</v-btn
        >
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
    getterType: "common/getField",
    mutationType: "common/updateField",
});
const { dialog, shell } = require("electron").remote;

export default {
    computed: {
        ...mapFields({
            projectMotherFolder: "projectRoot",
        }),
    },
    methods: {
        ...mapActions({
            setSnackbar: "common/setSnackbar",
        }),
        onClickSelectFolder() {
            dialog
                .showOpenDialog({
                    properties: ["openDirectory"],
                    defaultPath: this.projectMotherFolder,
                })
                .then((result) => {
                    if (!result.canceled && result.filePaths.length) {
                        this.projectMotherFolder = result.filePaths[0];
                    }
                });
        },
        onChangeProjectMotherFolder() {
            if (this.projectMotherFolder) {
                this.projectMotherFolder = this.projectMotherFolder.trim();
            }
            try {
                if (!fs.statSync(this.projectMotherFolder).isDirectory()) {
                    throw "Error";
                }
            } catch (err) {
                this.setSnackbar({
                    text: "올바른 폴더가 아닙니다. 다시 확인해주세요.",
                    isOpen: true,
                    color: "red",
                    btnColor: "white",
                });
            }
        },
        onClickOpenMotherFolder() {
            if (!this.projectMotherFolder) {
                return;
            }
            shell.openPath(this.projectMotherFolder);
        },
    },
};
</script>

<style>
</style>