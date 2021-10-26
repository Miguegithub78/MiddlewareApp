import React from 'react'
//import { auth } from "../firebaseConfig";
//import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles.css/Home.css";
import { Search } from "./Search";
const Home = () => {
   /* Addedconst [user, setUser] = useState(null)
   
   //onAuthStateChanged(auth, (userFirebase) => {
   //   if(userFirebase)console.log(userFirebase)
      
   //   else console.log('chau');
   })*/


     // const user = {
   //    name : userFirebase.displayName,
   //    email : userFirebase.email
      
   // }
   //esto va dentro del return
  /* <input  type="file" />
   hola 
   <button onClick={()=>signOut(auth)}>singout</button>*/
   return (
    <div className="containerhome">
        <Search />
        
      </div>
   )
}

export default Home
