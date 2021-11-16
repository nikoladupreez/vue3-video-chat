<template>
    <div class="webrtc">
        <div class="videos-container">
            <video
                ref="webcamVideo"
                class="webcam-video"
                autoplay
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
    import { ref } from 'vue';

    export default {
        name: 'WebRTC',
        async setup() {
            // Refs
            const webcamVideo =  ref(null);
            const remoteVideo =  ref(null);

            return {
                webcamVideo,
                remoteVideo,
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
