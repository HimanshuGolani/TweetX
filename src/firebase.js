import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS4kT4D8qVjExsSVLZkgzqJk1W1qNIxuE",
  authDomain: "blog-post-website-9336c.firebaseapp.com",
  projectId: "blog-post-website-9336c",
  storageBucket: "blog-post-website-9336c.appspot.com",
  messagingSenderId: "147205066000",
  appId: "1:147205066000:web:035d78eaeca18656c32995",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
