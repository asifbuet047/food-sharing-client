
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2J3RUlDn_btMDQoBxQDF7RnoSulVHE-Y",
  authDomain: "assignment-11-community-foods.firebaseapp.com",
  projectId: "assignment-11-community-foods",
  storageBucket: "assignment-11-community-foods.appspot.com",
  messagingSenderId: "685746896265",
  appId: "1:685746896265:web:bd57d40b5dcc7c9d6b3558"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();