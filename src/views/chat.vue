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
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    export default {
        name: 'Chat',

        components: {
            Messenger,
            WebRTC,
            ControlBar
        },

        async setup() {
            const store = useStore();
            const router = useRouter();

            // If not logged in, redirect to login view
            if (!store.state.userName) {
                router.push({
                    path: '/'
                })
            }

            return {
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
