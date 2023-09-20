import {initializeApp} from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider
        } from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'




const firebaseConfig = {
    apiKey: "AIzaSyAdiiiO8Wg4CZGw6zSYnMB2Pnp7PtVAhVY",
    authDomain: "stock2-db.firebaseapp.com",
    projectId: "stock2-db",
    storageBucket: "stock2-db.appspot.com",
    messagingSenderId: "89077871887",
    appId: "1:89077871887:web:b69f04914680fdd3ac7a7a"
  };
  
   
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  

  provider.setCustomParameters({
    promp: "select_account"
  })
  
  export const auth = getAuth();
  export const signInWithGooglePopup =() => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

  }

  export const getCategoriesAndDocuments = async ()=> {
    const collectionRef = collection (db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap
  }

  /*
  {

   hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
   },

    hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
   },
   
   */

   export const createUserDocumentFromAuth = async(
     userAuth,
     additionalInformation = {}) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date()

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt,
          ...additionalInformation 
        })
      } catch(error){
        console.log('error creating the user', error.message)
      }
    }

    return userDocRef;


  }

  export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(! email || !password) return;

     return await createUserWithEmailAndPassword(auth, email, password)

  }


  export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(! email || !password) return;

     return await signInWithEmailAndPassword(auth, email, password)

  }

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);