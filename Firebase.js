// Firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGE80CEXQ3EPoCvhxk0De8uq8haqOdGLw",
  authDomain: "budgeting-app-e85c3.firebaseapp.com",
  projectId: "budgeting-app-e85c3",
  storageBucket: "budgeting-app-e85c3.appspot.com",
  messagingSenderId: "1071931141133",
  appId: "1:1071931141133:web:9cefa0d7d6802e3d117944",
};

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };

export const db = getFirestore(app);
