import router from '../../router';
import { getField, updateField } from 'vuex-map-fields';
import menuMain from '../../assets/menu_main';
import menuMaketour from '../../assets/menu_maketour';
import moment from "moment";

export const state = {
    projectRoot: '',
    menu_main: menuMain,
    menu_maketour: menuMaketour,
    snackbar: {
        isOpen: false,
        timeout: 2500,
        text: '',
        btnColor: null,
        color: null,
    },
    dialogLoading: false,
    dialogLoadingData: {
        title: '',
        content: '',
        progress: 0,
    },
}
export const getters = {
    getField,
}
export const mutations = {
    updateField,
    setSnackbar(state, payload) {
        state.snackbar = {
            ...state.snackbar, ...payload,
            btnColor: payload.btnColor ? payload.btnColor : 'red',
            color: payload.color ? payload.color : '',
        };
    },
    setProjectRoot(state, payload) {
        state.projectRoot = payload;
    },
    setDialogLoading(state, payload) {
        state.dialogLoading = payload;
        if (payload === false) {
            state.dialogLoadingData.title = '';
            state.dialogLoadingData.content = '';
        }
    },
    setDialogLoadingData(state, payload) {
        state.dialogLoadingData = { ...state.dialogLoadingData, ...payload };
    },

}
export const actions = {
    onRouterPush(context, payload) {
        if (router.history.current.path !== payload && confirm('진짜 이동하시겠습니까?')) {
            router.push(payload)
        }
    },
    formatedTimestamp(_, { second }) {
        let format = "YYYYMMDD_HHmm";
        if (second) {
            format = format + "ss";
        }
        return moment().format(format);
    },
    setSnackbar(context, payload) {
        context.commit('setSnackbar', payload);
    },
    setProjectRoot(context, payload) {
        context.commit('setProjectRoot', payload);
    },
    setDialogLoading(context, payload) {
        context.commit('setDialogLoading', payload);
    },
    setDialogLoadingData(context, payload) {
        context.commit('setDialogLoadingData', payload);
    },

}
