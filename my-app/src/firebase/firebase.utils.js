import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBul-y_I5OWFZMKvSiJcGOQgJWoqU6ixCA",
    authDomain: "e-commerceapp-9214c.firebaseapp.com",
    databaseURL: "https://e-commerceapp-9214c.firebaseio.com",
    projectId: "e-commerceapp-9214c",
    storageBucket: "",
    messagingSenderId: "429963388380",
    appId: "1:429963388380:web:a229c798a9d3a878"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
