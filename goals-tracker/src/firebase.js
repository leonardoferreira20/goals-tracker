import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8lQTYPGLFBbPCQ64Kze3j4s0VkBDagvk",
  authDomain: "goals-tracker-fd886.firebaseapp.com",
  projectId: "goals-tracker-fd886",
  storageBucket: "goals-tracker-fd886.firebasestorage.app",
  messagingSenderId: "444745897311",
  appId: "1:444745897311:web:562146d461e1e5ef57d2ea",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
