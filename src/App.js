import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route} from 'react-router-dom';
import SignIn from "./routes/sign-in/sign-in.component";




const Shop = () =>{
  return(
    <h1>I am the shop page</h1>
  )
}

const App = () =>{
  return(
    <Routes>
      <Route path="/" element={<Navigation/>}>
         <Route index={true} element={<Home/>} />
         <Route path="shop" element={<Shop/>} />
         <Route path="signIn" element={<SignIn/>} />
      </Route>
    </Routes>      
  )
    
}

export default App;
