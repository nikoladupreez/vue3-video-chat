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
    import { ref, onMounted } from 'vue';
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
