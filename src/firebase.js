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
