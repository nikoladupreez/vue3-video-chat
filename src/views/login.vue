<template>
    <div id="view-login" class="view">
        <div class="login-form">
            <h1>Vue3 Video Chat</h1>
            <h3>Create a new chat or enter an existing chat</h3>
        </div>

        <input
            class="input-username"
            type="text"
            v-model="inputObj.userName"
            placeholder="Enter your username">

        <div class="create-join-chat">
            <button
                class="button-create-chat"
                :disabled="!inputObj.userName"
                @click="createChat">New chat</button>

            <div class="join-chat">
                <input
                    type="text"
                    v-model="inputObj.chatId"
                    placeholder="Enter a chat id">
                <button
                    :disabled="!inputObj.userName || !inputObj.chatId"
                    @click="joinChat">Join</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: 'Login',
        async setup() {
            // Refs
            const inputObj = ref({
                userName: '',
                chatId: '',
            });

            // Methods
            const createChat = () => {
                console.log('create chat');
            };

            const joinChat = () => {
                console.log('join chat');
            }

            return {
                inputObj,
                createChat,
                joinChat
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
