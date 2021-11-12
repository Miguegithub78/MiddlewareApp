import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublications,
  putLike,
  postPublications,
  getUserAction,
  putPublications,
  changePicturePublications
} from "../../redux/actions/index";

import s from "./Publications.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import styles from "./Publications.module.css";
export const Publications = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const publications = useSelector((state) => state.publications);
  const user = useSelector((state) => state.user);
  const publiImg = useSelector((state) => state.imgPublication);

  var [idPost, setIdPost] = useState(null);

  var [loadingImg, setLoadingImg] = useState(false);

  var [imgPubli, setImgPubli] = useState(null);

  var [postPublication, setPostPublication] = useState({
    description: "",
    photograph: undefined
  });

  var [editarPost, setEditarPost] = useState(false);

  var deccriptionWindow = useRef(null);

  useEffect(() => {
    dispatch(getPublications());
  }, []);

  function postDescription() {
    if (postPublication.description !== "" && !editarPost) {

      console.log("post", publiImg)

      dispatch(postPublications({description: postPublication.description, photograph: publiImg}, user.userType, user._id));
    }
    else if(editarPost){
      dispatch(putPublications(idPost, user._id, {description: postPublication.description, photograph: publiImg}));
    }
  }

  function addLikes(idPublications) {
    setIdPost(idPublications);
    dispatch(putLike(idPublications, user._id));
  }

  function handleChange() {
    setPostPublication({
      description: deccriptionWindow.current.value,
    });
    console.log("getImg2", publiImg)
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });

  async function publicationImg(e){

    setLoadingImg(true)

    const picture = e.target.files[0]

    await dispatch(changePicturePublications(picture))

    setImgPubli(publiImg)

    setLoadingImg(false)
  }

  return publications ? (
    <div className="container">
      <br></br>
      {/*  Button trigger modal  */}
      <button
        type="button"
        className="btn btn-block btn-dark btn-outline-light"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
        onClick={()=>setEditarPost(false)}
      >
        Nueva publicación
      </button>

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
                {editarPost ? "Editar publicación" : "Nueva publicación"}
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
                <label className="form-label">{editarPost ? "Descripción" : "Escribe algo"}</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  ref={deccriptionWindow}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label">Seleciona una imagen</label>
                <input className="form-control" type="file" id="formFile" onChange={(e)=>publicationImg(e)} />
              </div>
            </div>
            <div className="modal-footer">
              {
                loadingImg

                ? <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={postDescription}
                  disabled
                >
                  Cargando imagen
                </button>

                : <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={postDescription}
                  >
                    Agregar
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="col-lg-12 text-center">
          <div className="col">
            {publications ? (
              publications.map((e, i) => (
                <div className="mb-1">
                  <div className="card-section">
                    <div
                      className={`card text-center  bg-ligth bg-opacity-100${styles.card}`}
                    >
                      <div className={s.name}>
                        
                          <img
                            src={e.junior && e.junior.photograph}
                            className="rounded-circle p-1 bg-primary"
                            style={{ width: " 50px ", height: " 50px " }}
                            alt="Card cap"
                          />

                        <span>
                          {" "}
                          {e.junior ? e.junior.name : e.company.name}{" "}
                          <span className={s.spanPequeño}>
                            {e.junior ? "Programador" : "Empresa"}
                          </span>
                        </span>
                      </div>

                      <div className={s.description}>
                        <span>{e.description}</span>
                      </div>
                      <div className={s.divDivImg}>

                        <div className={s.divImg}>
                          <img
                            className={s.img}
                            src={
                              e.photograph
                                ? e.photograph
                                : "https://i.pinimg.com/736x/44/ca/1d/44ca1db525ebc3a45bbe815633d7b9b1.jpg"
                            }
                            alt="Imagen del post"
                          />
                        </div>

                      </div>
                      <div className={s.divButton}>
                        <span className="me-3">{e.likesNumber}</span>
                        <button
                          className={
                            
                            e.likes.length === e.likesNumber && !e.likes.includes(user ? user._id : '12345')
                            ? s.btnBlue
                            : s.btnBlueLike
                          }

                          onClick={() => {
                            addLikes(e._id);
                            if (
                              e.likes.length === e.likesNumber &&
                              !e.likes.includes(user._id)
                            ) {
                              e.likesNumber += 1;
                            }
                          }}
                        >
                          <i className="bi bi-hand-thumbs-up" style={{ fontSize: 16 }}></i>
                        </button>

                        {
                          (e.junior ? e.junior._id : e.company._id) === (user ? user._id : '12345') ? 
                          <div>
                            <button
                            onClick={()=>{setEditarPost(true); setIdPost(e._id)}}
                            type="button"
                            className="btn btn-block btn-dark btn-outline-light rounded"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalCenter"
                            >Editar</button>
                          </div> 
                          : <div></div>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={s.loader}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={s.loader}></div>
  );
};
