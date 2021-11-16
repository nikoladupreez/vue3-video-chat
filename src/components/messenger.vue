<template>
    <div class="messenger" :class="{hidden: !store.state.showMessenger}">
        <div class="messages">
            <div
                v-for="message in store.state.messages"
                :key="message.timeStamp"
                class="message-container"
                :class="{local: message.userName === store.state.userName}">
                <p>{{message.userName}}</p>
                <div class="message">{{ message.content }}</div>
            </div>
        </div>
        <div class="messenger-bar">
            <input
                type="text"
                v-model="inputMessenger"
                placeholder="Type message"
                @keyup.enter="onSend">
            <button
                class="button-send"
                :disabled="!inputMessenger"
                @click="onSend">
                <img :src="require(`@/assets/images/send-${!inputMessenger ? 'off' : 'on'}.png`)" alt="send">
            </button>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useChat } from '@/firebase.js'

    export default {
        name: 'Messenger',

        async setup() {
            const store = useStore();
            const { getMessages, sendMessage } = useChat();

            // Refs
            const inputMessenger = ref('');

            // Methods
            const onSend = async () => {
                if (!inputMessenger.value) return;

                const message = {
                    userName: store.state.userName,
                    content: inputMessenger.value,
                    timeStamp: new Date().toTimeString()
                }

                sendMessage(store.state.chatId, message);
                inputMessenger.value = '';
            }

            // Get messages
            await getMessages(store, store.state.chatId);

            return {
                store,
                inputMessenger,
                onSend,
            }
        },
    }
</script>

<style scoped lang="scss">
    .messenger {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10;
        @include flex(flex-start, center, column);
        border-radius: 10px;
        padding: 10px;
        width: 80%;
        max-width: 300px;
        height: 95%;
        background: $gray;

        &.hidden {
            right: -100%;
        }

        .messages {
            @include flex(flex-end, flex-start, column);
            position: relative;
            overflow: auto;
            width: 100%;
            height: 90%;

            .message-container {
                p {
                    font-size: 10px;
                }

                .message {
                    margin-bottom: 10px;
                    border-radius: 20px;
                    padding: 7px 15px;
                    font-size: 13px;
                    text-align: center;
                    background: $blue;
                    color: white;
                }

                &.local {
                    align-self: flex-end;

                    p {
                        text-align: right;
                    }

                    .message {
                        background: white;
                        color: $off-black;
                    }
                }
            }

        }

        .messenger-bar {
            position: relative;
            @include flex(center, center, row);
            margin-top: 10px;
            width: 100%;

            input {
                border-radius: 30px;
                border: none;
                padding: 15px 60px 15px 15px;
                width: 90%;
                max-height: 18px;
                overflow: auto;
                background: $gray-dark;
                resize: none;

                &:empty:before {
                    content: attr(placeholder);
                    color: #555;
                }

                &:focus {
                    border: none;
                    outline: none;
                }
            }

            .button-gif {
                position: absolute;
                right: 65px;
            }

            .button-send {
                margin-top: 2px;
                border: none;
                width: 30px;
                height: 30px;
                background: none;
                cursor: pointer;

                img {
                    height: 25px;
                }
            }
        }
    }
</style>
