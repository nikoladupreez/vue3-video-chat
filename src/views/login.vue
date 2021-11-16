<template>
    <div id="view-login" class="view">
        <div class="login-form">
            <h1>Vue3 Video Chat</h1>
            <h3>Create a new chat or enter an existing chat</h3>

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
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { useChat } from '@/firebase.js';

    export default {
        name: 'Login',
        async setup() {
            const store = useStore();
            const router = useRouter();
            const { setUpConnection,
                    createOffer,
                    answerCall } = useChat();

            // Refs
            const inputObj = ref({
                userName: '',
                chatId: '',
            });

            inputObj.value.userName = store.state.userName;

            // Methods
            const createChat = async () => {
                if (!inputObj.value.userName) return;
                inputObj.value.chatId = await createOffer(store.state.pc);
                store.dispatch('joinChat', { inputObj: inputObj.value, router });
            };

            const joinChat = async () => {
                if (!inputObj.value.userName || !inputObj.value.chatId) return;
                await answerCall(inputObj.value.chatId, store.state.pc);
                store.dispatch('joinChat', { inputObj: inputObj.value, router });
            }

            // Set up connection
            await setUpConnection(store);

            return {
                inputObj,
                createChat,
                joinChat
            }
        },
    }
</script>

<style scoped lang="scss">
    #view-login {
        h1, h3 {
            width: 90%;
            text-align: center;
        }

        h3 {
            margin: 5px 0 30px 0;
        }

        .login-form {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            @include flex(center, center, column);
            box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            padding: 30px;
            width: 65%;
            max-width: 400px;

            @include mobile {
                padding: 30px 15px;
                width: 75%;
            }

            .input-username {
                margin-bottom: 20px;
            }

            .create-join-chat {
                @include flex(center, center, row);
                width: 100%;

                .button-create-chat {
                    margin-right: 20px;
                    padding: 10px 20px;
                    min-width: 120px;

                    &:not(:disabled ){
                        background: $blue;
                        color: white;
                    }

                    @include mobile {
                        margin-right: 15px;
                        padding: 10px;
                        min-width: 80px;
                    }
                }

                .join-chat {
                    @include flex(flex-start, center, row);
                    position: relative;


                    input {
                        margin-right: 2px;
                    }

                    input:placeholder-shown + button {
                        display: none;
                    }

                    input:focus + button {
                        display: inline-block;
                    }

                    input:focus,
                    input:not(:placeholder-shown) {
                        width: calc(100% - 60px);
                    }

                    button {
                        position: absolute;
                        right: -25px;
                        padding: 10px 15px;
                        min-width: 20px;
                        background: none;

                        &:not(:disabled) {
                            color: $blue;

                            &:hover {
                                background: $blue-light;
                            }
                        }
                    }

                    @include mobile {
                        input {
                            width: calc(100% - 15px);
                        }

                        button {
                            right: -8px;
                            padding: 10px;

                            &:not(:disabled):hover  {
                                background: none;
                            }
                        }
                    }
                }
            }

            input {
                border-radius: 5px;
                padding: 10px;
                border: 1px solid $gray;
                width: stretch;

                &:focus {
                    border-color: $blue;
                    outline: 1px solid $blue;
                }
            }

            button {
                align-self: center;
                border-radius: 5px;
                border: none;
                cursor: pointer;
            }
        }
    }
</style>
