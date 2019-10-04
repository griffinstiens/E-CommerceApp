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

  /* 
    With a query, Firestore returns two types of objects: references and snapshots. Of these objects, they can either be
    Document or Collection versions.
    Firestore will ALWAYS return us these objects
  */
  //asynchronous function to call API
  export const createUserProfileDocument = async(userAuth, additionalData) => {
    //if no userAuth object
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //any CRUD methods (Create, Remove, Update, Delete) require use of documentRef objects, not snapshots
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date(); //gives current date

      try {
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
          console.log("Error creating user: ", error.message);
      }
    }

  return userRef;

  }


  //initializing firebase
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
