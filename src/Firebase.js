import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_R7-521hIP3MDkuUNwV1-i8Oh5VPJB1s",
  authDomain: "logincent-dix-traders.firebaseapp.com",
  projectId: "logincent-dix-traders",
  storageBucket: "logincent-dix-traders.firebasestorage.app",
  messagingSenderId: "905728579892",
  appId: "1:905728579892:web:9984c7943e4e56c408ad61",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();