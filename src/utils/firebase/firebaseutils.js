import {initializeApp} from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider} from 'firebase/auth'


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