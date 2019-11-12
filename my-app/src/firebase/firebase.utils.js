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

  //initializing firebase, auth, firestore
  firebase.initializeApp(config);

  /* 
    With a query, Firestore returns two types of objects: references and snapshots. Of these objects, they can either be
    Document or Collection versions.
    Firestore will ALWAYS return us these objects
  */
  //asynchronous function to call API
  //user userAuth object to query db for document ref object
  export const createUserProfileDocument = async(userAuth, additionalData) => {
    //if no userAuth object
    if (!userAuth) return;
    //attaching userRef to userID
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //getting the snapshot data
    const snapShot = await userRef.get();
    
    //any CRUD methods (Create, Remove, Update, Delete) require use of documentRef objects, not snapshots
    //if document exists, do nothing - if nothing exists, create
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date(); //gives current date

      try {
        //.set creates new document with all of the below properties inside db
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
          console.log("Error creating user: ", error.message);
      }
    }

    return userRef;

  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();

    //forEach doesn't return new array
    objectsToAdd.forEach(obj => {
      //give new document ref with new generated UID
      const newDocRef = collectionRef.doc();

      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  }

  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Setting up Google Sign-In
  const provider = new firebase.auth.GoogleAuthProvider();
  //Enables pop-up prompt provided by Google to sign in
  provider.setCustomParameters({ prompt: 'select_account' });
  //Exporting the Google Sign in function that receives auth, provider
  //passed to sign-in.component with onClick
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
