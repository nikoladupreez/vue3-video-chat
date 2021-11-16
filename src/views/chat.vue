<template>
    <div id="view-chat" class="view">
        <div class="chat-container">
            <Messenger />
            <WebRTC />
        </div>

        <ControlBar />
    </div>
</template>

<script>
    import Messenger from '@/components/messenger';
    import WebRTC from '@/components/web-rtc';
    import ControlBar from '@/components/control-bar';

    export default {
        name: 'Chat',

        components: {
            Messenger,
            WebRTC,
            ControlBar
        },

        async setup() {
            return {
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
