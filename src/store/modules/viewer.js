import $ from "jquery";
import moment from 'moment';
import store from '../../store';

const fs = require("fs");
const path = require("path");
const X2JS = require("x2js");

export const state = {
    krpano: null,
    krpanoElement: null,
    moveHotspots: [],
    isOpenNadirLogoDrawer: false,
    isOpenMoveHotspotDrawer: false,
    isMoveHotspotEditModeOn: false,
    xmlConvertedToJs: {},
    xmlPath: null,
    isOpenModalForSelectScene: false,
    isOpenModalForDestView: false,
    selectedScene: null,
    selectedMoveHotspotName: null,
    onDownMoveHotspot: null,
}
export const getters = {
}
export const mutations = {
    resetKrpano(state) {
        state.krpano = null;
        $(state.krpanoElement).html("");
    },
    setKrpano(state, payload) {
        state.krpano = payload;
    },
    setKrpanoElement(state, payload) {
        state.krpanoElement = payload;
    },
    setXmlConvertedToJs(state, payload) {
        state.xmlConvertedToJs = payload;
    },
    setXmlPath(state, payload) {
        state.xmlPath = payload;
    },
    setIsOpenModalForSelectScene(state, payload) {
        state.isOpenModalForSelectScene = payload;
    },
    setIsOpenModalForDestView(state, payload) {
        state.isOpenModalForDestView = payload;
    },
    setSelectedScene(state, payload) {
        state.selectedScene = payload;
    },
    setOnDownMoveHotspot(state, payload) {
        state.onDownMoveHotspot = payload;
    },
    async setEnableMoveHotspot(state, payload) {
        if (state.krpano) {
            state.krpano.get(`hotspot`).getArray().forEach(element => {
                if (element.name.indexOf('mvhotspot_') != -1) {
                    if (element.capture) {
                        element._capture = element.capture;
                    }
                    if (!payload && element._capture) {
                        element.capture = element._capture;
                    } else {
                        element.capture = payload;
                        if (state.krpano.get(`hotspot[${element.name}].style`) != "style_drag_movehotspot_distortion") {
                            state.krpano.call(`hotspot[${element.name}].loadstyle(style_drag_movehotspot_distortion)`)
                        }
                    }
                    state.krpano.set(`hotspot[${element.name}].isavailabledrag`, payload);
                }
            });
        }
    },
    toggleIsMoveHotspotEditModeOn(state) {
        if (state.krpano) {
            state.isMoveHotspotEditModeOn = !state.isMoveHotspotEditModeOn;
            if (state.krpano) {
                state.krpano.set('hsEditMode', state.isMoveHotspotEditModeOn);
            }
            
            store.dispatch('viewer/setEnableMoveHotspot', state.isMoveHotspotEditModeOn);
        }
    },
    setIsMoveHotspotEditModeOn(state, payload) {
        if (state.krpano) {
            state.isMoveHotspotEditModeOn = payload;
            if (state.krpano) {
                state.krpano.set('hsEditMode', payload);
            }
            store.dispatch('viewer/setEnableMoveHotspot', payload);
        }
    },
    toggleNadirLogoDrawer(state, payload) {
        if (state.krpano) {
            state.isOpenNadirLogoDrawer = !state.isOpenNadirLogoDrawer;
        }
    },
    toggleMoveHotspotDrawer(state, payload) {
        if (state.krpano) {
            state.isOpenMoveHotspotDrawer = !state.isOpenMoveHotspotDrawer;
        }
    },
}
export const actions = {
    resetKrpano(context, isForced) {
        if (!isForced && !confirm("진짜 VR을 닫으시겠습니까?")) {
            return;
        }
        context.state.isMoveHotspotEditModeOn = false;
        context.state.isOpenNadirLogoDrawer = false;
        context.state.isOpenMoveHotspotDrawer = false;
        context.commit('resetKrpano');
    },
    setKrpano(context, payload) {
        context.commit('setKrpano', payload);
    },
    setKrpanoElement(context, payload) {
        context.commit('setKrpanoElement', payload);
    },
    setXmlConvertedToJs(context, payload) {
        context.commit('setXmlConvertedToJs', payload);
    },
    setXmlPath(context, payload) {
        context.commit('setXmlPath', payload);
    },
    setIsOpenModalForSelectScene(context, payload) {
        context.commit('setIsOpenModalForSelectScene', payload);
    },
    setIsOpenModalForDestView(context, payload) {
        context.commit('setIsOpenModalForDestView', payload);
    },
    setSelectedScene(context, payload) {
        context.commit('setSelectedScene', payload);
    },
    setEnableMoveHotspot(context, payload) {
        context.commit('setEnableMoveHotspot', payload);
    },
    toggleIsMoveHotspotEditModeOn(context, payload) {
        context.commit('toggleIsMoveHotspotEditModeOn', payload);
    },
    setIsMoveHotspotEditModeOn(context, payload) {
        context.commit('setIsMoveHotspotEditModeOn', payload);
    },
    async addBeforeLookto({state, dispatch}) {
        if (state.krpano && state.onDownMoveHotspot) {
            let mvHotspot = state.krpano.get(`hotspot[${state.onDownMoveHotspot}]`);
            dispatch('updateHotspot', { _name: mvHotspot.name, _linkedscene_before_lookto: `${state.krpano.get('view.hlookat')},${state.krpano.get('view.vlookat')},${state.krpano.get('view.fov')}` });
        }
    },
    async deleteBeforeLookto({state, dispatch}) {
        if (state.krpano && state.onDownMoveHotspot) {
            let mvHotspot = state.krpano.get(`hotspot[${state.onDownMoveHotspot}]`);
            dispatch('updateHotspot', { _name: mvHotspot.name, _linkedscene_before_lookto: null });
        }
    },
    toggleNadirLogoDrawer(context, payload) {
        context.commit('toggleNadirLogoDrawer', payload);
    },
    toggleMoveHotspotDrawer(context, payload) {
        context.commit('toggleMoveHotspotDrawer', payload);
    },
    getMoveHotspotByName({state}, name) {
        return state.moveHotspots.filter((hs) => {
            return hs.name == name;
        });
    },
    onClickMoveHotspotOnEditMode({state}, moveHotspotName) {
        state.isOpenModalForSelectScene = true;
        state.selectedMoveHotspotName = moveHotspotName;
    },
    setOnDownMoveHotspot(context, payload) {
        context.commit('setOnDownMoveHotspot', payload);
    },
    onUpMoveHotspot({ state, commit, dispatch }, moveHotspotName) {
        if (state.krpano) {
            let mvHotspot = state.krpano.get(`hotspot[${moveHotspotName}]`);
            dispatch('updateHotspot', { _name: moveHotspotName, _ath: mvHotspot.ath, _atv: mvHotspot.atv });
        }
    },
    async addMoveHotspot({ state, commit, dispatch }) {
        const hsUrl = '%CURRENTXML%/skin/vtourskin_hotspot.png';
        const currentH = state.krpano.get('view.hlookat');
        const currentV = state.krpano.get('view.vlookat');
        const distorted = true;
        const capture = false;
        const editOffClick = `skin_hotspotstyle_click_custom();`;
        const editOnClick = `js(App.$children[0].onClickMoveHotspotOnEditMode(get(name)))`;
        const onClick = 'if(hsEditMode, callwith(hotspot[get(name)], editOnClick);, callwith(hotspot[get(name)], editOffClick); );';

        let currentTime = await store.dispatch('common/formatedTimestamp', { second : true });
        let mvhsName = `mvhotspot_${currentTime}`;
        
        state.krpano.call(`addhotspot(${mvhsName})`);
        state.krpano.set(`hotspot[${mvhsName}].url`, hsUrl);
        state.krpano.set(`hotspot[${mvhsName}].ath`, currentH);
        state.krpano.set(`hotspot[${mvhsName}].atv`, currentV);
        state.krpano.set(`hotspot[${mvhsName}].distorted`, distorted);
        state.krpano.set(`hotspot[${mvhsName}].capture`, capture);
        state.krpano.set(`hotspot[${mvhsName}].editOffClick`, editOffClick);
        state.krpano.set(`hotspot[${mvhsName}].editOnClick`, editOnClick);
        state.krpano.set(`hotspot[${mvhsName}].onclick`, onClick);
        state.krpano.call(`hotspot[${mvhsName}].loadstyle(style_drag_movehotspot_distortion)`);
        dispatch('setIsMoveHotspotEditModeOn', true);
        dispatch('setOnDownMoveHotspot', mvhsName);
        
        let copiedJs = { ...state.xmlConvertedToJs };
        let sceneIdx = await dispatch('_getCurrentSceneIdx');
        if (sceneIdx == undefined) {
            return;
        }

        if (!copiedJs.krpano.scene[sceneIdx].hotspot) {
            copiedJs.krpano.scene[sceneIdx].hotspot = [];
        } else {
            if (!Array.isArray(copiedJs.krpano.scene[sceneIdx].hotspot)){
                copiedJs.krpano.scene[sceneIdx].hotspot = [copiedJs.krpano.scene[sceneIdx].hotspot];
            }
        }
        let hotspotData = {
            _name: mvhsName,
            _url: hsUrl,
            _ath: currentH,
            _atv: currentV,
            _distorted: distorted,
            _capture: capture,
            _editOffClick: editOffClick,
            _editOnClick: editOnClick,
            _onclick: onClick,
        };
        if (state.isMoveHotspotEditModeOn) {
            hotspotData._style = 'style_drag_movehotspot_distortion';
        }
        copiedJs.krpano.scene[sceneIdx].hotspot.push(hotspotData)

        commit('setXmlConvertedToJs', copiedJs)
    },
    async removeMoveHotspot({state, commit, dispatch}){
        if (state.krpano) {
            state.krpano.call(`removehotspot(${state.onDownMoveHotspot})`);
        }

        let copiedJs = { ...state.xmlConvertedToJs };
        let sceneIdx = await dispatch('_getCurrentSceneIdx');
        if (sceneIdx == undefined) {
            return;
        }

        if (copiedJs.krpano.scene[sceneIdx].hotspot && Array.isArray(copiedJs.krpano.scene[sceneIdx].hotspot) && copiedJs.krpano.scene[sceneIdx].hotspot.length) {
            for(let i=0; i<copiedJs.krpano.scene[sceneIdx].hotspot.length; i++){
                if(copiedJs.krpano.scene[sceneIdx].hotspot[i]._name == state.onDownMoveHotspot){
                    copiedJs.krpano.scene[sceneIdx].hotspot.splice(i, 1);
                }
            }
        }
        
        dispatch('setOnDownMoveHotspot');
        commit('setXmlConvertedToJs', copiedJs)
    },
    _getCurrentSceneIdx({ state }) {
        let scenes = state.krpano.get('scene').getArray();
        for (let i = 0; i < scenes.length; i++){
            if (scenes[i].name == state.krpano.get('xml.scene')) {
                return i;
            }
        }  
    },
    async updateHotspot({ state, commit, dispatch }, hotspotData) {
        let copiedJs = { ...state.xmlConvertedToJs };
        let sceneIdx = await dispatch('_getCurrentSceneIdx');
        if (sceneIdx == undefined) {
            return;
        }
        
        let theHotspotIdx;
        if (!copiedJs.krpano.scene[sceneIdx].hotspot) {
            copiedJs.krpano.scene[sceneIdx].hotspot = [];
        } else {
            if (!Array.isArray(copiedJs.krpano.scene[sceneIdx].hotspot)){
                copiedJs.krpano.scene[sceneIdx].hotspot = [copiedJs.krpano.scene[sceneIdx].hotspot];
            }
        }
        if (copiedJs.krpano.scene[sceneIdx].hotspot.length) {
            let theHotspot = copiedJs.krpano.scene[sceneIdx].hotspot.filter((hs, idx) => {
                if (hs._name == hotspotData._name) {
                    theHotspotIdx = idx;
                    return hs;
                }
            })
            copiedJs.krpano.scene[sceneIdx].hotspot[theHotspotIdx] = { ...theHotspot[0], ...hotspotData };
        }
        commit('setXmlConvertedToJs', copiedJs)
    },
    addCrossLayers(_, krpano) {
        const crossColor = "0xff00ff";
        const crossColorAlpha = "0.5";
        krpano.call("addlayer(barhrz)");
        krpano.set("layer[barhrz].type", "container");
        krpano.set("layer[barhrz].width", krpano.get("stagewidth"));
        krpano.set("layer[barhrz].height", 4);
        krpano.set("layer[barhrz].y", -2);
        krpano.set("layer[barhrz].bg", true);
        krpano.set("layer[barhrz].bgcolor", crossColor);
        krpano.set("layer[barhrz].bgalpha", crossColorAlpha);
        krpano.set("layer[barhrz].align", "center");
        krpano.set("layer[barhrz].edge", "center");
        krpano.set("layer[barhrz].enabled", false);
        krpano.set("layer[barhrz].autoalpha", true);

        krpano.call("addlayer(barvtc)");
        krpano.set("layer[barvtc].type", "container");
        krpano.set("layer[barvtc].height", krpano.get("stageheight"));
        krpano.set("layer[barvtc].width", 4);
        krpano.set("layer[barvtc].x", -2);
        krpano.set("layer[barvtc].bg", true);
        krpano.set("layer[barvtc].bgcolor", crossColor);
        krpano.set("layer[barvtc].bgalpha", crossColorAlpha);
        krpano.set("layer[barvtc].align", "center");
        krpano.set("layer[barvtc].edge", "center");  
        krpano.set("layer[barvtc].enabled", false);  
        krpano.set("layer[barvtc].autoalpha", true);  
    },
    setCrossLayers(_, { krpano, value }) {
        krpano.set("layer[barhrz].alpha",value);
        krpano.set("layer[barvtc].alpha",value);
    },
    toggleCrossLayers(_, krpano) {
        krpano.set(
            "layer[barhrz].alpha",!krpano.get("layer[barhrz].alpha")
        );
        krpano.set(
            "layer[barvtc].alpha",!krpano.get("layer[barvtc].alpha")
        );
    },
    saveJsonToXml({ state, dispatch }) {
        let x2js = new X2JS();
        let xml = x2js.js2xml(state.xmlConvertedToJs);
        if (dispatch('_backupXml', state.xmlPath)) {
            fs.writeFileSync(state.xmlPath, xml);
            store.dispatch('common/setSnackbar', {
                text: "저장이 완료되었습니다.",
                isOpen: true,
                color: "gree",
                btnColor: "white",
            });
        };
    },
    async _backupXml({ state }, xmlPath) {
        let xmlPathExt = path.extname(xmlPath);
        let filename = xmlPath.substr(
            0,
            xmlPath.length - xmlPathExt.length
        );
        let currentTime = await store.dispatch('common/formatedTimestamp', { second : true });
        let newFileName = `${filename}_backup_${currentTime}.xml`;
        await fs.copyFileSync(xmlPath, newFileName, (err) => {
            if (err) throw err;
        });

        if(!fs.existsSync(newFileName)){
            return false
        }
        return true
    },
}
