<template>
    <div class="control-bar">
        <p class="chat-id">id: {{store.state.chatId}}</p>
        <div class="buttons-center">
            <button class="button-chat" @click="toggleMediaTrack">Audio</button>
            <button class="button-chat" @click="toggleMediaTrack">Video</button>
            <button class="button-chat leave" @click="onLeave">Leave</button>
        </div>
        <button class="button-chat messenger" @click="toggleMessenger">Messenger</button>
    </div>
</template>

<script>
    import { useStore } from 'vuex';

    export default {
        name: 'ControlBar',
        async setup() {
            const store = useStore();

            // Methods
            const onLeave = () => {
                console.log('leave');
            };

            const toggleMessenger = () => {
                console.log('toggle messenger');
            };

            const toggleMediaTrack = () => {
                console.log('toggle media track');
            }

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
