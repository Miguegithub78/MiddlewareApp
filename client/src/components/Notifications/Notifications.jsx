import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {useHistory} from 'react-router-dom'
import { auth } from "../../firebaseConfig";
import { getUserAction } from '../../redux/actions';
import Socket from "../socket.js";
import s from '../Notifications/campana.svg';
import './Notifications.css'



const Notifications = () => {
    const user = useSelector((state) => state.user);
    var [idUser, setIdUser] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(()=>{

      setTimeout(()=>{
  
      setIdUser(user?._id)
    }, 500)
      
  }, [user])

    useEffect(()=>{

    Socket.on('liked',(data)=>{
        if(data.userPublicationId === idUser){
        setNotifications((prev) => [...prev, data])
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
        <div className='icons'>
          <div className='icon' onClick={() => setOpen(!open)}>
            <img src={s} className='iconImg' alt=''/>
            <div className='counter'>{notifications.length}</div>
          </div>
          { open && (
          <div className='notifications'>
           {notifications?.map(el => {
             return (
               <li>{ `${el.user} le dió me gusta a tu publicacion` }</li>
             )
           })}
           </div>
          )}
        </div>
    ) : ('...No hay notificaciones que mostrar')
}

export default Notifications;
