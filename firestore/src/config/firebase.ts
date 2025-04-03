import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

interface FirebaseInstance {
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
}

let firebaseInstance: FirebaseInstance | null = null;

export const initializeFirebase = (config: FirebaseConfig): FirebaseInstance => {
    try {
        if (firebaseInstance) {
            console.log('Firebase already initialized');
            return firebaseInstance;
        }

        // Validate config
        if (!config.apiKey || !config.projectId) {
            throw new Error('Invalid Firebase configuration. API Key and Project ID are required.');
        }

        const app = initializeApp(config);
        const firestore = getFirestore(app);
        const auth = getAuth(app);

        firebaseInstance = { app, firestore, auth };
        console.log('Firebase initialized successfully');
        return firebaseInstance;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
};

export const getFirebaseInstance = (): FirebaseInstance => {
    if (!firebaseInstance) {
        throw new Error('Firebase not initialized. Call initializeFirebase first.');
    }
    return firebaseInstance;
}; 