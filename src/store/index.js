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
    showMessenger: false,
    messages: [],
};

export default createStore({
    state,
    getters,
    actions,
    mutations
});
