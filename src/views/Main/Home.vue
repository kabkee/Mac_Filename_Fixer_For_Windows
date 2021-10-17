<template>
    <div class="home">
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
            console.info("files", files);
            await _self.renameFiles(files);
            this.initMsg = this.initMsg_;
            this.initMsg_sub = this.initMsg_sub_;
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
            this.initMsg = this.initMsg_prog;
            this.initMsg_sub = "";

            for (let i = 0; i < files.length; i++) {
                file = files[i];
                if (fs.statSync(file.path).isDirectory()) {
                    console.info("file is directory,", file);
                    console.info("readdir,", fs.readdirSync(file.path));

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

                    this.renameFiles(subFiles);

                    let subFile;
                    for (let i = 0; i < subFiles.length; i++) {
                        subFile = subFiles[i];
                        fs.rename(
                            subFile.path,
                            path.join(
                                path.dirname(subFile.path),
                                subFile.name.normalize("NFC")
                            ),
                            (error) => {
                                if (error) {
                                    console.error(error);
                                }
                            }
                        );
                    }
                } else {
                    fs.rename(
                        file.path,
                        path.join(
                            path.dirname(file.path),
                            file.name.normalize("NFC")
                        ),
                        (error) => {
                            if (error) {
                                console.error(error);
                            }
                        }
                    );
                }
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
