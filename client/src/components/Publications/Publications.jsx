import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPublications, putLike, postPublications, getUserAction } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import s from './Publications.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useHistory } from 'react-router-dom';

export default function Publication(){

    const history = useHistory();

    const dispatch = useDispatch();
    const publications = useSelector(state => state.publications)
    const user = useSelector(state => state.user)

    var [idPost, setIdPost] = useState(null)

    var [postPublication, setPostPublication] = useState({
        description: ''
    })

    var deccriptionWindow = useRef(null)

    useEffect(()=>{
        dispatch(getPublications())
    }, [])

    function postDescription(){
        
        if(postPublication.description !== ''){

            dispatch(postPublications(postPublication, "junior", user.idMongo))
            window.location.reload(true);
        }
    }

    function addLikes(idPublications){

        setIdPost(idPublications)

        dispatch(putLike(idPublications, user._id))
    }

    function handleChange(){

        setPostPublication({
            description: deccriptionWindow.current.value
        })
    }


    onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

    return (
        <div>
            <NavBar />

                {/*  Button trigger modal  */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                    Nueva publicación
                </button>

                {/*  Modal  */}
                <div className="modal fade" id="exampleModalCenter" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Nueva publicación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        <div>
                            <label className="form-label">Escribe algo</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={deccriptionWindow} onChange={handleChange} ></textarea>
                        </div>

                        <div className="mb-3 mt-4">
                            <label className="form-label">Seleciona una imagen</label>
                            <input className="form-control" type="file" id="formFile"/>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={postDescription}>Agregar</button>
                    </div>
                    </div>
                </div>
                </div>

                <div className={s.cards}>
                    {
                        publications ? publications.map((e, i) => 

                            <div className={e.junior ? s.cardJunior : s.cardCompany} key={e._id}>
                                
                                <div className={s.name}>
                                    <span>{e.junior ? e.junior.name : e.company.name}  <span className={s.spanPequeño}>{e.junior ? "Junior" : "Empresa"}</span></span>  
                                </div>

                                <div className={s.description}>
                                    <span>{e.description}</span>
                                </div>

                                <div>
                                    <img className={s.img} src={e.photograph ? e.photograph : "https://i.pinimg.com/736x/44/ca/1d/44ca1db525ebc3a45bbe815633d7b9b1.jpg"} alt="Imagen del post" />
                                </div>

                                <div className={s.divButton}>
                                    <button className={s.btnBlue} onClick={()=>{addLikes(e._id); if( e.likes.length === e.likesNumber && !e.likes.includes(user._id)){e.likesNumber += 1}}} >Like</button>
                                     <span> Likes {e.likesNumber}</span> 
                                </div>

                            </div>

                        ) : <h1>Cargando...</h1>
                    }
                </div>
                
        </div>
    )
}