import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Mapa from "../MapDetails/Mapa";
import { db } from '../../firebaseConfig'
import { collection, getDocs, getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import NavBar from '../NavBar/NavBar';

export default function CompanyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyDetails(id))
  }, [dispatch]);

  const company = useSelector(state => state.details)

  //CHAT

  const [message, setMessage] = useState({})
  var [state, setState] = useState({ messages: [], owners: null, ownersNames: null })
  var [idChat, setIdChat] = useState('')
  var [currentIdChat, setCurrentIdChat] = useState('')
  var [oneCompany, setOneCompany] = useState('')

  const user = useSelector((state) => state.user);
  const companies = useSelector((state) => state.companies);

  async function searchCompanyDetails(id) {

    // dispatch(getCompanyDetails(id))

    var [campany] = companies.filter(e => e._id == id)
    setOneCompany(campany)

    let idtemporal = user._id < campany._id ? user._id + campany._id : campany._id + user._id
    setCurrentIdChat(user._id < campany._id ? user._id + campany._id : campany._id + user._id)

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
          to: oneCompany._id,
          img: "",
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
          to: oneCompany._id
        })

        setIdChat(currentIdChat)
      }

      //Mando los datos a la base de datos
      await setDoc(doc(db, "messages", currentIdChat), {
        owners: state.owners == null ? { user1: user._id, user2: oneCompany._id } : state.owners,
        chat: list,
        ownersNames: state.ownersNames == null ? { user1: user.name, user2: oneCompany.name } : state.ownersNames
      });
    }
    catch (err) {
      console.log(err.message)
    }
  }

  function handleOnChangeMessage(e) {

    setMessage(e.target.value)
  }

  return (

    <div className="">
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

        <NavBar />

        <div className='row align-items-center justify-content-center '>
          <div className='col-5 text-center p-3  bg-white text-dark border border-3'>
            <h4 className="display-4 ">{company.name}</h4>
            <img src={company.photograph} style={{ width: " 150px ", height: " 180px " }} alt='Imagen no encontrada'></img>
            <h6 className="mb-0 me-auto p-3 ">
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
              Website: {company.webpage}
            </h6>
            <h6 className="mb-0 p-3">
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
              Email: {company.gmail}
            </h6>
            <h6 className="mb-0 p-3">País: {company.country}</h6>
            <h6 className="mb-0 p-3">Provincia: {company.state}</h6>
            <h6 className="mb-0 p-3">Ciudad: {company.city}</h6>
            <h6 className="mb-0 p-3">Acerca de: {company.description}</h6>
            {user && user.userType == 'juniors' ?
              <button type="button" onClick={() => searchCompanyDetails(company._id)}
                type="button"
                className="btn btn-block btn-dark btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter" >Enviar mensaje</button>
              : <div></div>
            }
          </div>

          <div className='col-6 text-center p-3 mb-2 bg-white text-dark border border-3'>
            <Mapa />
          </div>
        </div>
      </div>
    </div>



  );
}