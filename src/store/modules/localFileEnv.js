import router from '../../router';
const fs = require('fs');
const localEnvFilePath = 'localEnv.json';

export const state = {
    localEnv: {},
}
export const getters = {}
export const mutations = {
    setLocalEnv(state, payload) {
        state.localEnv = { ...payload };
    },
}
export const actions = {
    loadLocalEnv(context) {
        let rawdata = fs.readFileSync(localEnvFilePath);
        let localEnv = JSON.parse(rawdata);
        context.commit('setLocalEnv', localEnv);
    },
    setLocalEnv(context, payload) {
        context.commit('setLocalEnv', payload);
    },
    saveLocalEnv(context) {
        console.info('context.state.localEnv', context.state.localEnv)
        let data = JSON.stringify(context.state.localEnv, null, 4);
        fs.writeFileSync(localEnvFilePath, data);
    },
}
