export default {
    setUserName (state, userName) {
        state.userName = userName;
    },

    setChatId (state, chatId) {
        state.chatId = chatId;
    },

    setPeerConnection (state, pc) {
        state.pc = pc;
    },

    setLocalStream (state, stream) {
        state.localStream = stream;
    },

    setRemoteStream (state, stream) {
        state.remoteStream = stream;
    },
};
