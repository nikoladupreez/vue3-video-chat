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

    toggleMessenger (state) {
        state.showMessenger = !state.showMessenger;
    },

    setMessages (state, messages) {
        state.messages = messages;
    },

    updateMessages (state, message) {
        state.messages.unshift(message)
    },

    leaveChat (state) {
        state.chatId = '';
        state.showMessenger = false;
        state.pc.close();
    }
};
