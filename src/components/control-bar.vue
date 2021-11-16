<template>
    <div class="control-bar">
        <p class="chat-id">id: {{store.state.chatId}}</p>
        <div class="buttons-center">
            <button class="button-chat" @click="toggleMediaTrack(store.state.localStream.getAudioTracks()[0])">Audio</button>
            <button class="button-chat" @click="toggleMediaTrack(store.state.localStream.getVideoTracks()[0])">Video</button>
            <button class="button-chat leave" @click="onLeave">Leave</button>
        </div>
        <button class="button-chat messenger" @click="toggleMessenger">Messenger</button>
    </div>
</template>

<script>
    import { useStore } from 'vuex';
    import { useChat } from '@/firebase.js';

    export default {
        name: 'ControlBar',
        async setup() {
            const store = useStore();
            const { toggleMediaTrack } = useChat();

            // Methods
            const onLeave = () => {
                console.log('leave');
            };

            const toggleMessenger = () => {
                console.log('toggle messenger');
            };

            return {
                store,
                onLeave,
                toggleMessenger,
                toggleMediaTrack
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
