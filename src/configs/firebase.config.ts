import { getAuth, onIdTokenChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import store from "../store";
import { onSignInSuccess } from "../store/auth/sessionSlice";

const firebaseConfig = {
  apiKey: "AIzaSyD5R5uyVtxPxvLlYrXZKJ70VLGL7BwwmoY",
  authDomain: "apps-personales-709a6.firebaseapp.com",
  projectId: "apps-personales-709a6",
  storageBucket: "apps-personales-709a6.appspot.com",
  messagingSenderId: "145756375395",
  appId: "1:145756375395:web:7c860283e33efb5e872b56"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

function updateIdToken(token: string) {
  store.dispatch(onSignInSuccess(token));
}

onIdTokenChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then(updateIdToken);
  } else {
    signOut(auth)
  }
});