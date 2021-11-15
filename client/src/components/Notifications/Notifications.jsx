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
            notifications: null
        }
    ])
    
    const notificationsPrueba = [
            {idPublication: 1234,
            type: 2,
            publiDescription: "les dejo un link para mostrarles como armar el cv",
            userclickbuttonid: 3456,
            userclickbname: 'jesuanP'
        },
        {idPublication: 1234,
            type:1,
            publiDescription: "ando buscando laburo",
            userclickbuttonid: 3456,
            userclickbname: 'jesuanP'
        },
        {idPublication: 1234,
            type: 1,
            publiDescription: "en mi laburo buscan un front end, les dejo el link",
            userclickbuttonid: 3456,
            userclickbname: 'jesuanP'
        },
        {idPublication: 1234,
            type: 2,
            publiDescription: "buen dia red",
            userclickbuttonid: 3456,
            userclickbname: 'jesuanP'
        },
    ]

    
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
    

    return user && user.userType === 'juniors' ? (
        
        <div >
            <div className="notifications" id="box">
                <h2>Notificaciones</h2>
                <div className="notifications-item">
                    {
                    notificationsPrueba.type === 2 ? 
                    <h1>Typo 2</h1>
                    :
                    <h1>Typo 1</h1>
                    }
                </div>
            </div>
        </div>
    ) : ( 'Cargando' )
};


export default Notifications;
