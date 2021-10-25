import {useState} from 'react'
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
   const [user, setUser] = useState(null)
   
   onAuthStateChanged(auth, (userFirebase) => {
      if(userFirebase)console.log(userFirebase)
      
      else console.log('chau');
   })
   // const user = {
   //    name : userFirebase.displayName,
   //    email : userFirebase.email
      
   // }


   return (
      <div>
         <input  type="file" />
         hola 
         <button onClick={()=>signOut(auth)}>singout</button>
      </div>
   )
}

export default Home
