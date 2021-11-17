import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {useHistory} from 'react-router-dom'
import { auth } from "../../firebaseConfig";
import { getUserAction } from '../../redux/actions';


const Notifications = () => {
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [notifications, setNotifations] = useState([

    ]);

    useEffect(() => {
        console.log('prueba')
    }, [])

onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });


    return (
        <div>
           hola 
        </div>
    )
}

export default Notifications;
