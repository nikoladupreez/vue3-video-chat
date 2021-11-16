import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize
const config = {
    apiKey: 'AIzaSyABjmiAvg0W3NkdKVJ2OTnTHlnyyfgO8ig',
    authDomain: 'video-chat-app-83046.firebaseapp.com',
    projectId: 'video-chat-app-83046',
    storageBucket: 'video-chat-app-83046.appspot.com',
    messagingSenderId: '1072717172736',
    appId: '1:1072717172736:web:513a3937c5e1c31c9408e5'
}

firebase.initializeApp(config);

const firestore = firebase.firestore();
const servers = {
    iceServers: [{
        urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302'
              ],
    }],
    iceCandidatePoolSize: 10,
};


// Usable
export function useChat() {
    const setUpConnection = async (store) => {
        // Create peer connection and media streams
        const pc = new RTCPeerConnection(servers);
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const remoteStream = new MediaStream();

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // Store local stream
        store.commit('setLocalStream', localStream);

        // Pull tracks that get added later and add to remote stream
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);

                // Store remote stream
                store.commit('setRemoteStream', remoteStream);
            });
        };

        // Store peer connnection
        store.commit('setPeerConnection', pc);

        return;
    };

    return {
        setUpConnection,
    }
}
