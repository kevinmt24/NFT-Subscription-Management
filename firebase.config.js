import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAKdk4OmvjSse5fTksu7A4ENBHZUVqEK5U",
  authDomain: "medium-6ef13.firebaseapp.com",
  projectId: "medium-6ef13",
  storageBucket: "medium-6ef13.appspot.com",
  messagingSenderId: "893861422978",
  appId: "1:893861422978:web:bb7e1e1b416a7ac547919b"
  };

  const app = initializeApp(firebaseConfig);

  export default app;