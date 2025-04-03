import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

let firebaseApp: any = null;
let firestore: any = null;
let auth: any = null;

export const initializeFirebase = (config: FirebaseConfig) => {
    if (!firebaseApp) {
        firebaseApp = initializeApp(config);
        firestore = getFirestore(firebaseApp);
        auth = getAuth(firebaseApp);
    }
    return { firebaseApp, firestore, auth };
};

export const getFirebaseInstance = () => {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized. Call initializeFirebase first.');
    }
    return { firebaseApp, firestore, auth };
}; 