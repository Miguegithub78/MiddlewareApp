import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getJuniorsDetails } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from '../../firebaseConfig'
import { collection, getDocs, getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";


export default function JuniorsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJuniorsDetails(id))
    console.log(juniors)
  }, [dispatch]);

  const juniors = useSelector(state => state.juniorsdetails)




  const [message, setMessage] = useState({})
  var [state, setState] = useState({ messages: [], owners: null, ownersNames: null })
  var [idChat, setIdChat] = useState('')
  var [currentIdChat, setCurrentIdChat] = useState('')
  var [onejunior, setOnejunior] = useState('')

  const user = useSelector((state) => state.user);

  async function generateChat() {

    let idtemporal = juniors._id < user._id ? juniors._id + user._id : user._id + juniors._id
    setCurrentIdChat(juniors._id < user._id ? juniors._id + user._id : user._id + juniors._id)

    if (idChat == '') {

      setIdChat(idtemporal)
    }

    const docRef = doc(db, "messages", idtemporal);
    const docSnap = await getDoc(docRef);

    setState({
      messages: docSnap.data() !== undefined ? docSnap.data().chat : [],
      owners: docSnap.data() !== undefined ? docSnap.data().owners : null,
      ownersNames: docSnap.data() !== undefined ? docSnap.data().ownersNames : null
    })
  }

  async function sendMessage() {

    try {

      if (idChat === currentIdChat) {

        var list = !state.messages ? [] : state.messages
        list.push({
          id: !state.messages ? 0 : state.messages.length,
          text: message,
          from: user._id,
          to: juniors._id
        })
      }

      if (idChat !== currentIdChat) {

        const docRef = doc(db, "messages", currentIdChat);
        const docSnap = await getDoc(docRef);

        setState({
          messages: docSnap.data() !== undefined ? docSnap.data().chat : [],
          owners: docSnap.data() !== undefined ? docSnap.data().owners : null,
          ownersNames: docSnap.data() !== undefined ? docSnap.data().ownersNames : null
        })

        var list = !state.messages ? [] : state.messages

        list.push({
          id: !state.messages ? 0 : state.messages.length,
          text: message,
          from: user._id,
          to: juniors._id
        })

        setIdChat(currentIdChat)
      }



      await setDoc(doc(db, "messages", currentIdChat), {
        owners: state.owners == null ? { user1: juniors._id, user2: user._id } : state.owners,
        chat: list,
        ownersNames: state.ownersNames == null ? { user1: juniors.name, user2: user.name } : state.ownersNames
      });
    }
    catch (err) {
      console.log(err.message)
    }
  }

  function handleOnChangeMessage(e) {

    setMessage(e.target.value)
  }


  return (<div>

    {/*  Modal  */}
    <div
      className="modal fade"
      id="exampleModalCenter"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Nuevo mensaje
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <label className="form-label">Escribe un mensaje</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => handleOnChangeMessage(e)}
              ></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={sendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>


    <div className='container-fluid '>
      <div>
        <Link to='/home/juniors'>
          <button className='btn btn-block btn-dark btn-outline-light'>
            Volver
          </button>
        </Link>
      </div>
      <div className='row align-items-center justify-content-center'>
        <div className='col-5 text-center'>
          <h4>{juniors.name}</h4>
          <img src={juniors.photograph} alt='Imagen no encontrada' width='200px' heigth='200px'></img>
          <h6 className="mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-globe me-2 icon-inline"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Website: {juniors.website}
          </h6>
          <h6 className="mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-mail">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Email:{juniors.gmail}
          </h6>

          <h6 className="mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github me-2 icon-inline"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Github: {juniors.github}
          </h6>

          <h6 className="mb-0">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-phone">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Teléfono:{juniors.phone}
          </h6>
          <h6 className="mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Titular:{juniors.title}
          </h6>
          <h6 className="mb-0">Tecnologías</h6>
          {juniors.technologies?.map((tec) => (
            <label
              className="btn btn-outline-dark m-1"
            >
              {tec.name}
            </label>
          ))}
          <h6 className="mb-0">Idiomas</h6>
          {juniors.languages?.map((lan) => (
            <label
              className="btn btn-outline-dark m-1"
            >
              {lan.name}
            </label>
          ))}
          <h6 className="mb-0">Habilidades</h6>
          {juniors.softskills?.map((soft) => (
            <label
              className="btn btn-outline-dark m-1"
            >
              {soft.name}
            </label>
          ))}
        </div>

        {user && user.userType == 'companies' ?
          <button type="button" onClick={() => generateChat()}
            type="button"
            className="btn btn-block btn-dark btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter" >Enviar mensaje</button>
          : <div></div>
        }

      </div>

    </div>

  </div >
  );
}