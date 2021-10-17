<template>
    <div class="home">
        <div
            id="dragFile"
            ref="dragFile"
            style="height: 100%; display: flex; align-items: center"
        >
            <h1 style="text-align: center; width: 100%">
                {{ initMsg }}
            </h1>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

import { mapState, mapActions } from "vuex";

export default {
    name: "Home",
    components: {},
    props: {},
    data() {
        return {
            initMsg: "파일을 떨어뜨려주세요.",
            initMsg_: "파일을 떨어뜨려주세요.",
            sideDrawerWidth: 250,
            items: [
                { title: "Home", icon: "mdi-home-city" },
                { title: "My Account", icon: "mdi-account" },
                { title: "Users", icon: "mdi-account-group-outline" },
            ],
        };
    },
    created() {},
    mounted() {
        let _self = this;
        // var holder = this.$refs.dragFile;
        var holder = document.body;

        holder.addEventListener("dragover", (evt) => {
            evt.preventDefault();

            this.initMsg = "파일을 놓으세요!";
            return false;
        });
        holder.addEventListener("dragleave", (evt) => {
            evt.preventDefault();

            this.initMsg = this.initMsg_;
            //     return false;
        });

        holder.addEventListener("drop", async (evt) => {
            evt.preventDefault();

            let files = evt.dataTransfer.files;
            console.info(files);

            _self.renameFiles(files);
        });
    },
    computed: {
        ...mapState({}),
    },
    methods: {
        ...mapActions({
            formatedTimestamp: "common/formatedTimestamp",
            resetKrpano: "viewer/resetKrpano",
            setKrpano: "viewer/setKrpano",
            setKrpanoElement: "viewer/setKrpanoElement",
            setXmlConvertedToJs: "viewer/setXmlConvertedToJs",
            setXmlPath: "viewer/setXmlPath",
            _backupXml: "viewer/_backupXml",
        }),
        renameFiles(files) {
            let file;
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                fs.rename(file.name, file.name.normalize("NFC"), () => {});
            }
        },
    },
};
</script>

<style scoped>
.home,
#pano {
    width: 100%;
    height: 100%;
}
.home {
    position: relative;
}

.only-pc {
    display: none;
}
@media screen and (min-width: 960px) {
    .only-pc {
        display: block;
    }
}

.nuSkinBtn,
.nuSkinBtn:focus {
    background-color: #651fbb;
    position: absolute;
}
.nuSkinBtn:active,
.nuSkinBtn:hover {
    background-color: #440099 !important;
    border-color: #440099 !important;
}

.goBackBtn {
    top: 1em;
    left: 1em;
}
.menuBtn {
    top: 1em;
    right: 1em;
}
</style>
