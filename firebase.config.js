import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "medium-6ef13.firebaseapp.com",
  projectId: "medium-6ef13",
  storageBucket: "medium-6ef13.appspot.com",
  messagingSenderId: "893861422978",
  appId: "1:893861422978:web:bb7e1e1b416a7ac547919b"
  };

  const app = initializeApp(firebaseConfig);

  export default app;