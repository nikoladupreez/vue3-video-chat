<template>
    <div class="control-bar">
        <p class="chat-id">id: {{store.state.chatId}}</p>
        <div class="buttons-center">
            <button
                class="button-chat"
                :class="{ mute: !audioIsOn }"
                @click="audioIsOn = toggleMediaTrack(audioTrack)">Audio</button>
            <button
                class="button-chat"
                :class="{ mute: !videoIsOn }"
                @click="videoIsOn = toggleMediaTrack(videoTrack)">Video</button>
            <button
                class="button-chat leave"
                @click="store.dispatch('leaveChat', router);">Leave</button>
        </div>
        <button
            class="button-chat messenger"
            :class="{ open: store.state.showMessenger}"
            @click="store.commit('toggleMessenger');">Messenger</button>
    </div>
</template>

<script>
    import { ref, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { useChat } from '@/firebase.js';

    export default {
        name: 'ControlBar',
        async setup() {
            const store = useStore();
            const router = useRouter();
            const { toggleMediaTrack } = useChat();

            // Refs
            const audioIsOn = ref(true);
            const videoIsOn = ref(true);

            // Computed
            const audioTrack = computed(() => store.state.localStream.getAudioTracks()[0]);
            const videoTrack = computed(() => store.state.localStream.getVideoTracks()[0]);

            return {
                store,
                router,
                audioIsOn,
                videoIsOn,
                audioTrack,
                videoTrack,
                toggleMediaTrack
            }
        },
    }
</script>

<style scoped lang="scss">
    .control-bar {
        position: relative;
        height: 10%;
        width: 100%;
        background: $off-black;

        .chat-id,
        .buttons-center,
        .messenger {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .button-chat {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: $gray;
            color: white;
            cursor: pointer;

            &.mute,
            &.leave {
                background: $red;
            }

            &.leave {
                width: 60px;
                border-radius: 20px;
            }
        }

        .chat-id {
            left: 20px;
            margin: 0;
            font-size: 13px;
            font-weight: $light;
            color: white;
        }

        .buttons-center {
            left: 50%;
            transform: translate(-50%, -50%);

            .button-chat {
                margin: 0 5px;
            }
        }

        .button-chat.messenger {
            right: 20px;

            &.open {
                background: $blue;
            }
        }
    }
</style>
