<template>
    <div class="home">
        <v-container>
            <v-text-field
                v-model="selfConvert"
                label="변환 할 글씨"
                required
            >
                <v-btn
                    slot="append"
                    color="gray"
                    fab
                    x-small
                    @click='selfConvert = ""'
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-text-field>
            <v-text-field
                :value='convertedSelf'
                readonly
                label="변환 후 글씨"
                @click='copyText'
                ref='textToCopy'
            ></v-text-field>
            <div
                id="dragFile"
                ref="dragFile"
                style="height: 100%; display: flex; align-items: center"
            >
                <h3 style="text-align: center; width: 100%">
                    {{ initMsg }}

                    <h5
                        v-if="initMsg_sub"
                        style="text-align: center; width: 100%; color: #666; display: block;"
                    >
                        {{ initMsg_sub }}
                    </h5>
                </h3>
            </div>
        </v-container>
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
            initMsg_prog: "변환 중...",
            initMsg_sub: "",
            initMsg_sub_: "변환완료. 또 주세요.",
            sideDrawerWidth: 250,
            items: [
                { title: "Home", icon: "mdi-home-city" },
                { title: "My Account", icon: "mdi-account" },
                { title: "Users", icon: "mdi-account-group-outline" },
            ],
            selfConvert: '',
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
            // console.info("files", files);
            await _self.renameFiles(files);
            this.initMsg = this.initMsg_;
            this.initMsg_sub = this.initMsg_sub_;
        });
    },
    computed: {
        ...mapState({}),
        convertedSelf(){
            return this.selfConvert?this.selfConvert.normalize('NFC'):'';
        }
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
        async renameFiles(files) {
            let file;
            this.initMsg = this.initMsg_prog;
            this.initMsg_sub = "";

            for (let i = 0; i < files.length; i++) {
                file = files[i];
                if (fs.statSync(file.path).isDirectory()) {
                    let subFiles = [];
                    fs.readdirSync(file.path).forEach((sub_file) => {
                        // console.log(
                        //     sub_file,
                        //     fs.statSync(path.join(file.path, sub_file))
                        // );
                        subFiles.push({
                            name: sub_file,
                            path: path.join(file.path, sub_file),
                        });
                    });

                    await this.renameFiles(subFiles);

                    try {
                        let filePathArray = file.path.split(path.sep);
                        let currentFolder = filePathArray.pop();
                        let parentFolder = filePathArray.join(path.sep);
                        console.info('currentFolder, parentFolder', currentFolder, parentFolder)
                         
                        fs.renameSync(file.path, path.join(parentFolder, currentFolder.normalize("NFC")) );
                        // console.info(
                        //     "Directroy file.path converting",
                        //     file.path
                        // );
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    try {
                        fs.renameSync(
                            file.path,
                            path.join(
                                path.dirname(file.path),
                                file.name.normalize("NFC")
                            )
                        );
                        // console.info("file.path converting", file.name);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        },
        copyText(){
            let textToCopy = this.$refs.textToCopy.$el.querySelector('input')
          textToCopy.select()
          document.execCommand("copy");

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
