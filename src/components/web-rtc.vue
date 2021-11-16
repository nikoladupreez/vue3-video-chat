<template>
    <div class="webrtc">
        <div class="videos-container">
            <video
                ref="webcamVideo"
                class="webcam-video"
                autoplay
                muted
                playsinline></video>
            <video
                ref="remoteVideo"
                class="remote-video"
                autoplay
                playsinline></video>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';

    export default {
        name: 'WebRTC',
        async setup() {
            const store = useStore();

            // Refs
            const webcamVideo =  ref(null);
            const remoteVideo =  ref(null);

            // onMounted
            onMounted(() => {
                webcamVideo.value.srcObject = store.state.localStream;
                if (store.state.remoteStream.active) remoteVideo.value.srcObject = store.state.remoteStream;
            });

            // Watcher
            watch(() => store.state.remoteStream, (to, from) => {
                if (remoteVideo.value) remoteVideo.value.srcObject = to;
            });

            return {
                webcamVideo,
                remoteVideo,
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
