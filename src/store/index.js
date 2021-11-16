import { createStore } from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

const state = {
    userName: '',
    chatId: '',
    pc: {},
    localStream: {},
    remoteStream: {},
};

export default createStore({
    state,
    getters,
    actions,
    mutations
});
