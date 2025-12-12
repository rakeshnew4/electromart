// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUAbSNnYt6HrX0u25rwnH5wQzg3ZM9zmA",
  authDomain: "ai-app-8ebd0.firebaseapp.com",
  projectId: "ai-app-8ebd0",
  storageBucket: "ai-app-8ebd0.firebasestorage.app",
  messagingSenderId: "102232078820",
  appId: "1:102232078820:web:a989b45dc497116105aff1",
  measurementId: "G-DDKQ3GFB4J"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
