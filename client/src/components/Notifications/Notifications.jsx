import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {getPublications, getUserAction} from '../../redux/actions'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import './Notifications.css';

const Notifications = () => {
    const {user} = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();
    const [notifications, setNotifications] = useState([
        {
            notifications: [...user.publications, ...user.postulationsJobs]
        }
    ])
    

    
    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          if (user) return;
          dispatch(getUserAction(userFirebase));
        } else {
          history.push("/");
        }
      },[]);
   
    
    useEffect(() => {
        getPublications()
    }, [])

    console.log(user.publications)
    console.log(user.postulationsJobs)
    console.log(notifications)
    

    return user && user.userType === 'juniors' ? (
        
        <div>
            <div className="notifications" id="box">
                <h2>Notificaciones</h2>
                <div className="notifications-item">
                    {notifications[0].publicaciones?.map(el => {
                        return (
                        <div>
                            <li>Tu publicación '{el.description}' recibió un megusta, lleva {el.likesNumber} reacciones! <button>x</button> </li>
                        </div> 
                        
                        )
                    })}
                </div>
                <div className="notifications-item">
                    {user.postulationsJobs?.map(el => {
                        return (
                        <div>Te postulaste con exito al siguiente empleo: '{el}'</div> 
                        )
                    })}
                </div>
            </div>
        </div>
    ) : ( 'Cargando' )
};


export default Notifications;
