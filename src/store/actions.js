export const joinChat = ({ commit }, payload) => {
    commit('setUserName', payload.inputObj.userName);
    commit('setChatId', payload.inputObj.chatId);

    payload.router.push({
        path: `/chat`,
        query: { id: payload.inputObj.chatId }
    });
};

export const leaveChat = ({ commit }, router) => {
    commit('setChatId', '');
    commit('toggleMessenger', true); // force close
    commit('leaveChat');

    router.push({
        path: `/`
    });
};
