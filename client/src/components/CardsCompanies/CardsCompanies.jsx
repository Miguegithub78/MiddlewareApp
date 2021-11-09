import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./card.css";
import { useSelector } from 'react-redux';
import { getCompanyDetails } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { db } from '../../firebaseConfig'
import { collection, getDocs, getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";


export const CardsCompanies = ({ arrayCompanies }) => {

  const [message, setMessage] = useState({})
  var [state, setState] = useState({ messages: [] })
  var [idChat, setIdChat] = useState('')
  var [currentIdChat, setCurrentIdChat] = useState('')
  var [oneCompany, setOneCompany] = useState('')

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);
  const companies = useSelector((state) => state.companies);

  async function searchCompanyDetails(id){

    // dispatch(getCompanyDetails(id))

    var [campany] = companies.filter(e => e._id == id)
    setOneCompany(campany)

    let idtemporal = user._id < campany._id ? user._id + campany._id : campany._id + user._id
    setCurrentIdChat(user._id < campany._id ? user._id + campany._id : campany._id + user._id)

    if(idChat == ''){

      setIdChat(idtemporal)
    }

    const docRef = doc(db, "messages", idtemporal);
    const docSnap = await getDoc(docRef);

    setState({
      messages: docSnap.data() !== undefined ? docSnap.data().chat : []
    })
  }

  async function sendMessage(){

    try{

      if(idChat === currentIdChat){

        var list = !state.messages ? [] : state.messages
        list.push({
          id: !state.messages ? 0 : state.messages.length,
          text: message,
          from: user._id,
          to: oneCompany._id
        })
      }

      if(idChat !== currentIdChat){

        const docRef = doc(db, "messages", currentIdChat);
        const docSnap = await getDoc(docRef);

        setState({
          messages: docSnap.data() !== undefined ? docSnap.data().chat : []
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



      await setDoc(doc(db, "messages", currentIdChat), {
        chat: list
      });
    }
    catch(err){
      console.log(err.message)
    }
  }

  function handleOnChangeMessage(e){

    setMessage(e.target.value)
  }


  return (

    <div className="container">
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
                  onChange={(e)=>handleOnChangeMessage(e)}
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


    <div className="container">

      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="row">

            {arrayCompanies.map((p) => (

              <div className="col-lg-3 col-md 12 mb-4">

                <div className="card-section">

                  <div className={`card text-center  bg-ligth bg-opacity-100${styles.card}`} style={{ width: " 80% " }}>
                    <Link to={`/companies/${p._id}`} key={p.name}>

                      <img src={p.photograph} className="card-img-top mt-3 m" style={{ width: " 80% " }} alt="Card cap" />

                      <div className="card-body  text-dark">
                        <h6 className="card-title">{p.name}</h6>
                      </div>
                    </Link>

                    { user && user.userType == 'juniors' ?
                    <button type="button" onClick={()=>searchCompanyDetails(p._id)}
                    type="button"
                    className="btn btn-block btn-dark btn-outline-light"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter" >Enviar mensaje</button>
                    : <div></div>
                    }
                  </div >
                </div>
              </div>
            ))}
          </div >
        </div>

      </div>
    </div>
    </div>


  );
};