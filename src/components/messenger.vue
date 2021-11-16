<template>
    <div v-if="store.state.showMessenger" class="messenger">
        <div class="messages">
            <div
                v-for="message in store.state.messages"
                :key="message.timeStamp"
                class="message"
                :class="{local: message.userName === store.state.userName}">
                {{ message.content }}
            </div>
        </div>
        <div class="messenger-bar">
            <!-- <div
                ref="inputMessenger"
                class="input"
                contenteditable="true"
                placeholder="Type message"></div> -->
            <input
                type="text"
                v-model="inputMessenger"
                placeholder="Type message">
            <button @click="onSend">Send</button>
            <button class="button-gif">Gif</button>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    export default {
        name: 'Messenger',

        async setup() {
            const store = useStore();

            // Refs
            const inputMessenger = ref('');

            // Methods
            const onSend = async () => {
                const message = {
                    userName: store.state.userName,
                    content: inputMessenger.value,
                    timeStamp: new Date().toTimeString()
                }

                console.log('send message', message);
                inputMessenger.value = '';
            }

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
            left: -100%;
        }

        .messages {
            @include flex(flex-end, flex-start, column);
            width: 100%;
            height: 90%;

            .message {
                background: white;
                margin-bottom: 10px;
                border-radius: 20px;
                padding: 5px 10px;

                &.local {
                    align-self: flex-end;
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
        }
    }
</style>
