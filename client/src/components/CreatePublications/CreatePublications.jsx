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
    
      function validate(input) {
        let errors = {};
        if(!input.title) errors.title = 'Campo requerido!' 
        if(!input.description) errors.description = 'Campo requerido!'
        if(!input.country) errors.country = 'Campo requerido!'
        if(input.dollar === null) errors.dollar = 'Campo requerido!'
        if(!input.salary) errors.salary = 'Campo requerido!'
        if(!input.technologies) errors.technologies = 'Campo requerido!'
        return errors;
    }

    const [picture, setPicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        title: '',
        description: '',
        img: '',
        country: '',
        dollar: null,
        salary: 0,
        technologies: [],
    });

    function handleChange(e) {
        setInput(input => ({
            ...input,
            [e.target.name] : e.target.value
        }))
        setErrors(validate({
            ...input,
            [e.target.value] : e.target.value
        }));
    };

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

    // funcion que desabilita el poder enviar el form si no tiene campos rellenados
    (function () {
        'use strict'
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
    
            form.classList.add('was-validated')
            }, false)
        })
    })()

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
                    <form onSubmit={handleSubmit}className='needs-validation' novalidate>
                    <div className="row px-3"> 
                    <img  alt="img" className="user"  src={user.photograph} />
                    </div>  
                    <div className="row px-3"> 
                    <h4 className="mt-3 mb-5">{user.name}</h4>
                    </div>  
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Titulo:</h6>
                        <input className="text-muted bg-light mt-4 mb-3"
                        value={input.title}
                        onChange={handleChange}
                        name='title'
                        placeholder='Ej: Front/Back-End Jr' required></input>
                        {errors.title && (
                        <p className='perror'>{errors.title}</p>
                         )}
                    </div>
                    <div className="row px-3 form-group"> 
                        <h6 className="mb-0">Descripción:</h6>
                        <textarea className="text-muted bg-light mt-4 mb-3" 
                        placeholder="Agrega una descripción a tu publicación"
                         value={input.description}
                         onChange={handleChange}
                         name='description' required></textarea>
                           {errors.description && (
                        <p className='perror'>{errors.description}</p>
                         )}
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Ubicación:</h6>
                        <input className="text-muted bg-light mt-4 mb-3"
                        value={input.country}
                        onChange={handleChange}
                        name='country'
                        placeholder='Ej: Remoto/Buenos Aires' required></input>
                          {errors.country && (
                        <p className='perror'>{errors.country}</p>
                         )}
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Imagen:</h6>
                        <input type='file' id='loadfile'className="text-muted bg-light mt-4 mb-3"
                        onChange={handleChangePicture} 
                        ></input>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Dolares:</h6>
                        <select onChange={e => handleSelect(e)}className="text-muted bg-light mt-4 mb-3" required>
                        <option className="text-muted bg-light mt-4 mb-3" >Selecciona</option>
                        <option className="text-muted bg-light mt-4 mb-3" value='true'>Si</option>
                        <option className="text-muted bg-light mt-4 mb-3" value='false'>No</option>
                        </select>
                        {errors.dollar && (
                        <p className='perror'>{errors.dollar}</p>
                         )}
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Salario:</h6>
                        <input type='number'className="text-muted bg-light mt-4 mb-3"
                        value={input.salary}
                        onChange={handleChange}
                        name='salary' required></input>
                          {errors.salary && (
                        <p className='perror'>{errors.salary}</p>
                         )}
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
                        <button type='submit' className="btn btn-block btn-dark btn-outline-light">Publicar</button>
                        </form>
                    </div>
                </div>
            </div>
    ) : ( 
        "... cargando "
        )
};

export default CreatePublications;
