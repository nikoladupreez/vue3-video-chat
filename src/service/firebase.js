import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
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

    const createOffer = async (pc) => {
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');

        // Get offer candidates, save to db
        pc.onicecandidate = (event) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await callDoc.set({ offer });

        // Listen for remote answer
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });


        return callDoc.id;
    };

    const answerCall = async (id, pc) => {
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc(id);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        // Get answer candidates, save to db
        pc.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        // Get existing call data and set offer
        const callData = (await callDoc.get()).data();
        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        // Create answer
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        // When answered, add candidate to peer connection
        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    };

    const toggleMediaTrack = (media) => {
        // Turn off either audio or video
        media.enabled = !media.enabled;
        return media.enabled;
    };

    const getMessages = async (store, id) => {
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc(id);
        const dbMessages = callDoc.collection('messages');
        const messages = [];

        // Get messages from db
        await dbMessages.get().then(docs => {
            docs.forEach(doc => {
                messages.push({id: doc.id, ...doc.data()});
            });
        })

        // When a message is added, push message to store
        dbMessages.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const messageFound = messages.filter(message => {
                        return message.id === change.doc.id;
                    });

                    if (messageFound.length < 1) store.commit('updateMessages', {id: change.doc.id, ...change.doc.data()});
                }
            })
        })

        // Sort messages based on time send
        messages.sort((a, b) => {
            return new Date(b.timeStamp) - new Date(a.timeStamp);
        });

        // Store messages
        store.commit('setMessages', messages);

        return messages;
    };

    const sendMessage = (id, message) => {
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc(id);
        const messages = callDoc.collection('messages');

        // Add message to collection
        messages.add(message);

        return message;
    };

    return {
        setUpConnection,
        createOffer,
        answerCall,
        toggleMediaTrack,
        getMessages,
        sendMessage
    }
}
