import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {useHistory} from 'react-router-dom'
import { auth } from "../../firebaseConfig";
import { getUserAction } from '../../redux/actions';
import Socket from "../socket.js"
import { map } from '@firebase/util';


const Notifications = () => {
    const user = useSelector((state) => state.user);
    var [idUser, setIdUser] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{

      setTimeout(()=>{
  
      setIdUser(user?._id)
    }, 500)
      
  }, [user])

    useEffect(()=>{

    Socket.on('liked',(data)=>{
        if(data.userPublicationId === idUser){
        setNotifications([...notifications, data])
      }
     })
  }, [Socket, idUser])

onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });


    return notifications? (
        <div>
           {notifications?.map(el => {
             return (
               <h1>{el.user + 'le dió me gusta a tu publicacion' }</h1>
             )
           })}
        </div>
    ) : (<h1>No hay nada que mostrar</h1>)
}

export default Notifications;
