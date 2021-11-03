import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import tokenAuth from '../config/token';
import { getCompanies, getTechnologies, postPublications, changePicturePublicationAction, getUserAction } from "../../redux/actions";
import  './CreatePublications.css'

const CreatePublications = () => {
    const { user } = useSelector((state) => state);
    const { technologies } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(user)

    useEffect(() => {
        const token = localStorage.getItem('token');
		if (token&&user) {
			console.log('dispatch el tokeeenn', token);
			tokenAuth(token);
        dispatch(getTechnologies())
        }
    }, [user])

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          if (user) return;
          dispatch(getUserAction(userFirebase));
        } else {
          history.push("/");
        }
      });

    const [picture, setPicture] = useState(null);
    const [input, setInput] = useState({
        title: '',
        description: '',
        img: '',
        country: '',
        dollar: false,
        salary: 0,
        technologies: [],
    });

    function handleChange(e) {
        setInput(input => ({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            dollar: e.target.value
        })
    };
    function handleSelectTwo(e) {
        setInput({
            ...input,
            technologies: [...input.technologies, e.target.value]
        })
    };

    const handleChangePicture = (e) => {
        const picture = e.target.files[0];
        setPicture(picture);
        if (picture) {
            dispatch(changePicturePublicationAction(picture));
            }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPublications(input))
    }



    return user ? (   
            <div className="container px-4 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
            <Link
                className="btn btn-block btn-dark btn-outline-light"
                to="/home/companies"
            >
                Volver al inicio
            </Link>
                <div className="card">
                    <div className="row px-3"> 
                    <img  alt="img" className="user"  src={user.photograph} />
                    </div>  
                    <div className="row px-3"> 
                    <h4 className="mb-4">{user.name}</h4>
                    </div>  
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Titulo:</h6>
                        <input className="text-muted bg-light mt-4 mb-3"
                        value={input.title}
                        onChange={handleChange}
                        name='title'
                        placeholder='Ej: Front/Back-End Jr'></input>
                    </div>
                    <div className="row px-3 form-group"> 
                        <h6 className="mb-0">Descripción:</h6>
                        <textarea className="text-muted bg-light mt-4 mb-3" 
                        placeholder="Agrega una descripción a tu publicación"
                         value={input.description}
                         onChange={handleChange}
                         name='description'></textarea>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Ubicación:</h6>
                        <input className="text-muted bg-light mt-4 mb-3"
                        value={input.country}
                        onChange={handleChange}
                        name='country'
                        placeholder='Ej: Remoto/Buenos Aires'></input>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Imagen:</h6>
                        <input type='file' id='loadfile'className="text-muted bg-light mt-4 mb-3"
                        onChange={handleChangePicture}
                        ></input>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Dolares:</h6>
                        <select onChange={e => handleSelect(e)}className="text-muted bg-light mt-4 mb-3">
                        <option className="text-muted bg-light mt-4 mb-3" >Selecciona</option>
                        <option className="text-muted bg-light mt-4 mb-3" value='true'>Si</option>
                        <option className="text-muted bg-light mt-4 mb-3" value='false'>No</option>
                        </select>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Salario:</h6>
                        <input type='number'className="text-muted bg-light mt-4 mb-3"
                        value={input.salary}
                        onChange={handleChange}
                        name='salary'></input>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Tecnologias:</h6>
                        <select onChange={e => handleSelectTwo(e)}className="text-muted bg-light mt-4 mb-3">
                            {
                                technologies?.map(el => 
                                    <option key={el._id} className="text-muted bg-light mt-4 mb-3" value={el.name}>{el.name}</option>
                            )}
                        </select>
                    </div>
                        <button onClick={e => handleSubmit(e)}type='submit' className="btn btn-block btn-dark btn-outline-light">Publicar</button>
                    </div>
                </div>
            </div>
    ) : ( 
        "... cargando "
        )
};

export default CreatePublications;
