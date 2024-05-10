import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkwEyEGUxIHGe-S-1SUyUeMWhIblOsHyA',
  authDomain: 'barbearia-quinze.firebaseapp.com',
  projectId: 'barbearia-quinze',
  storageBucket: 'barbearia-quinze.appspot.com',
  messagingSenderId: '910380778111',
  appId: '1:910380778111:web:b2b4f762834c5d8a13354a',
  measurementId: 'G-PXXL4WY6YS'
};



const app = initializeApp(firebaseConfig);

const auth = initializeAuth (app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);

export { auth, db };


