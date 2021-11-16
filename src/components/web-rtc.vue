<template>
    <div class="webrtc">
        <div class="videos-container">
            <video
                ref="webcamVideo"
                class="webcam-video"
                :class="{small: store.state.remoteStream.active}"
                autoplay
                muted
                playsinline></video>
            <video
                ref="remoteVideo"
                class="remote-video"
                :class="{hidden: !store.state.remoteStream.active}"
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
                if (store.state.localStream.active) webcamVideo.value.srcObject = store.state.localStream;
                if (store.state.remoteStream.active) remoteVideo.value.srcObject = store.state.remoteStream;
            });

            // Watcher
            watch(() => store.state.remoteStream, (to, from) => {
                if (remoteVideo.value) remoteVideo.value.srcObject = to;
            });

            return {
                store,
                webcamVideo,
                remoteVideo,
            }
        },
    }
</script>

<style scoped lang="scss">
    .webrtc {
        @include flex(center, center, row);
        width: 95%;
        height: 100%;

        .videos-container {
            @include flex(center, center, row);
            position: relative;
            height: 100%;
            width: 100%;
            max-width: 1000px;

            .webcam-video,
            .remote-video {
                width: 100%;

                &.hidden {
                    display: none;
                }

                &.small {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 200px;
                    height: auto;
                }
            }
        }
    }
</style>
