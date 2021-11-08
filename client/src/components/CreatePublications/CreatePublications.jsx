import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import tokenAuth from '../config/token';
import {
  getTechnologies,
  postJobs,
  changePicturePublicationAction,
  getUserAction,
} from '../../redux/actions';
import './CreatePublications.css';
import NavBar from '../NavBar/NavBar';

const CreatePublications = () => {
  const { user } = useSelector((state) => state);
  const { technologies } = useSelector((state) => state);
  const { publication } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user) {
      tokenAuth(token);
      dispatch(getTechnologies());
    }
  }, [user]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push('/');
    }
  });

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = 'Campo requerido!';
    if (!input.description) errors.description = 'Campo requerido!';
    if (!input.country) errors.country = 'Campo requerido!';
    if (!input.city) errors.city = 'Campo requerido!';
    if (!input.currency) errors.currency = 'Campo requerido!';
    if (!input.salary) errors.salary = 'Campo requerido!';
    if (!input.technologies) errors.technologies = 'Campo requerido!';
    if (!input.date) errors.date = 'Campo requerido!';
    return errors;
  }

  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: '',
    description: '',
    photograph: '' || publication.photograph,
    country: '',
    city: '',
    currency: '',
    technologies: [],
    salary: 0,
    date: '',
    companyId: user._id,
    premium: user.premium,
    status: 'active',
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      currency: e.target.value,
    });
  }
  function handleSelectTwo(e) {
    setInput({
      ...input,
      technologies: [...input.technologies, e.target.value],
    });
  }

  const handleChangePicture = (e) => {
    const picture = e.target.files[0];
    setPicture(picture);
    if (picture) {
      dispatch(changePicturePublicationAction(picture));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postJobs(input));
    history.push('/home/empleos');
  }

  // funcion que desabilita el poder enviar el form si no tiene campos rellenados
  (function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  })();

  return user ? (
    <div>
      <NavBar />
      <div className='container px-4 py-5 mx-auto'>
        <div className='row d-flex justify-content-center'>
          <Link
            className='btn btn-block btn-dark btn-outline-light'
            to='/home/companies'
          >
            Volver al inicio
          </Link>
          <div className='card'>
            <form onSubmit={handleSubmit} className='needs-validation' novalidate>
              <div className='row px-3'>
                <img alt='img' className='user' src={user.photograph} />
              </div>
              <div className='row px-3'>
                <h4 className='mt-3 mb-5'>{user.name}</h4>
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Titulo:</h6>
                <input
                  className='text-muted bg-light mt-4 mb-3'
                  value={input.title}
                  onChange={handleChange}
                  name='title'
                  placeholder='Ej: Front/Back-End Jr'
                  required
                ></input>
                {errors.title && <p className='perror'>{errors.title}</p>}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Descripción:</h6>
                <textarea
                  className='text-muted bg-light mt-4 mb-3'
                  placeholder='Agrega una descripción a tu publicación'
                  value={input.description}
                  onChange={handleChange}
                  name='description'
                  required
                ></textarea>
                {errors.description && (
                  <p className='perror'>{errors.description}</p>
                )}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>País:</h6>
                <input
                  className='text-muted bg-light mt-4 mb-3'
                  value={input.country}
                  onChange={handleChange}
                  name='country'
                  placeholder='Ej: Argentina/Uruguay'
                  required
                ></input>
                {errors.country && <p className='perror'>{errors.country}</p>}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Ciudad:</h6>
                <input
                  className='text-muted bg-light mt-4 mb-3'
                  value={input.city}
                  onChange={handleChange}
                  name='city'
                  placeholder='Ej: Buenos Aires/Montevideo'
                  required
                ></input>
                {errors.city && <p className='perror'>{errors.city}</p>}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Imagen:</h6>
                <input
                  type='file'
                  id='loadfile'
                  className='text-muted bg-light mt-4 mb-3'
                  onChange={handleChangePicture}
                ></input>
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Moneda:</h6>
                <select
                  onChange={(e) => handleSelect(e)}
                  className='text-muted bg-light mt-4 mb-3'
                  required
                >
                  <option className='text-muted bg-light mt-4 mb-3'>
                    Selecciona
                  </option>
                  <option
                    className='text-muted bg-light mt-4 mb-3'
                    value='dollar'
                  >
                    Dolar
                  </option>
                  <option className='text-muted bg-light mt-4 mb-3' value='euro'>
                    Euros
                  </option>
                  <option className='text-muted bg-light mt-4 mb-3' value='otro'>
                    Otro
                  </option>
                </select>
                {errors.currency && <p className='perror'>{errors.currency}</p>}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Salario:</h6>
                <input
                  type='number'
                  className='text-muted bg-light mt-4 mb-3'
                  value={input.salary}
                  onChange={handleChange}
                  name='salary'
                  required
                ></input>
                {errors.salary && <p className='perror'>{errors.salary}</p>}
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Tecnologias:</h6>
                <select
                  onChange={(e) => handleSelectTwo(e)}
                  className='text-muted bg-light mt-4 mb-3'
                  required
                >
                  {technologies?.map((el) => (
                    <option
                      key={el._id}
                      className='text-muted bg-light mt-4 mb-3'
                      value={el._id}
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='row px-3 form-group'>
                <h6 className='mb-0'>Fecha:</h6>
                <input
                  className='text-muted bg-light mt-4 mb-3'
                  value={input.date}
                  onChange={handleChange}
                  name='date'
                  type='date'
                  placeholder='Ej: Buenos Aires/Montevideo'
                  required
                ></input>
                {errors.date && <p className='perror'>{errors.date}</p>}
              </div>
              <button
                type='submit'
                className='btn btn-block btn-dark btn-outline-light'
              >
                Publicar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    '... cargando '
  );
};

export default CreatePublications;
