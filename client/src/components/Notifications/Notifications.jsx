import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {useHistory} from 'react-router-dom'
import { auth } from "../../firebaseConfig";
import { getUserAction, deleteNotifications } from '../../redux/actions';
import Socket from "../socket.js";
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

    Socket.on('sendNotification',(data)=>{
        if(data.userPublicationId === idUser){
        setNotifications((prev) => [...prev, data])
      }
     })
  }, [Socket, idUser])

  useEffect(()=>{
    setNotifications(user?.notifications)
  }, [user])

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });

  const handleRead = () => {
    setNotifications([]);
    dispatch(deleteNotifications(user._id))
    setOpen(false);
  };

  console.log(notifications)

    return notifications? (
        <div className='icons'>
          <div className='icon' onClick={() => setOpen(!open)}>
            <i className="bi bi-bell-fill"></i>
            { notifications.length > 0 &&
              <div className='counter'>{notifications.length}</div>
            }
          </div>

          { open && (

          <div className='notifications'>

           {notifications?.map(el => 
              (
                el.typeNotification === 2
                ? <li>{ `${el.userName} Le dió me gusta a tu publicacion` }</li>
                : <li>{ `${el.userName} Se postulo a tu empleo` }</li>
              )

             )}

             <button className='nButton' onClick={handleRead}>Marcar como leído</button>
           </div>
          )}
        </div>
    ) : ('...No hay notificaciones que mostrar')
}

export default Notifications;
