import {initializeApp} from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        GoogleAuthProvider} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
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