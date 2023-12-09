import Home from "./routes/home/home.component";
import {useEffect} from 'react';
import { useDispatch } from "react-redux";
import { createUserDocumentFromAuth, onAuthStateChangedListener} from './utils/firebase/firebaseutils';
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route} from 'react-router-dom';
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () =>{

  const dispatch = useDispatch();


  useEffect(()=> {

    const unsubscibe = onAuthStateChangedListener((user)=>{
     if (user){
         createUserDocumentFromAuth(user)
     }
     dispatch(setCurrentUser(user));

     });

     return unsubscibe;

 }, []);
  return(
    <Routes>
      <Route path="/" element={<Navigation/>}>
         <Route index={true} element={<Home/>} />
         <Route path="shop/*" element={<Shop/>} />
         <Route path="auth" element={<Authentication/>} />
         <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>      
  )
    
}

export default App;
 
