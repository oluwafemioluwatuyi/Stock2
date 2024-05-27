/* eslint-disable no-unused-vars */
import {initializeApp} from 'firebase/app';
import {getAuth,
        //signInWithRedirect,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider,
        User,
        NextOrObserver
        } from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import Category from '../../routes/category/category.component';

import { category } from '../../store/categories/category.types';


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
  export type ObjectToAdd = {
    title: string
  }
  export const addCollectionAndDocument = async<T extends ObjectToAdd> (
    collectionKey: string,
     objectsToAdd: T[]
    ) : Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

  }

  export const getCategoriesAndDocuments = async (): Promise<category[]>=> {
    const collectionRef = collection (db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
      return  querySnapshot.docs.map(docSnapShot => docSnapShot.data() as category)
  }
    export type UserData = {
      createdAt: Date;
      displayName: string;
      email: string
    }
    export type AdditionalInformation = {
      displayName?: string
    }

   export const createUserDocumentFromAuth = async(
     userAuth: User,
     additionalInformation = {} as AdditionalInformation
    ) : Promise<void | QueryDocumentSnapshot<UserData> >=> {

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
        console.log('error creating the user', error)
      }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;


  }

  export const createAuthUserWithEmailAndPassword = async(email: string, password:string) => {
    if(! email || !password) return;

     return await createUserWithEmailAndPassword(auth, email, password)

  }


  export const signInAuthUserWithEmailAndPassword = async(email:string, password:string) => {
    if(! email || !password) return;

     return await signInWithEmailAndPassword(auth, email, password)

  }

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

 export const getCurrentUser = ():Promise<User| null> => {
  return new Promise((resolve, reject)=>{
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
 } 