import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getCompanies, getTechnologies } from "../../redux/actions";
import  './CreatePublications.css'

const CreatePublications = () => {
    const { companies } = useSelector((state) => state);
    const { technologies } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanies())
        dispatch(getTechnologies())
    }, [])

    const [input, setInput] = useState({
        title: '',
        description: '',
        img: '',
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

    const compania = {
        id: 10,
				img: 'https://www.globant.com/sites/default/files/2021-04/Globant_.png',
				company: 'Globant',
				title: 'frontend',
				description: '',
				country: 'remote',
				city: '',
				dollar: true,
				salary: 1000,
				tech: ['javascript', 'react', 'node'],
				date: '10/31/2021',
				premium: 0,
    }


    return companies ? (   
            <div className="container px-4 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="card">
                    <div className="row px-3"> 
                    <img  alt="img" className="user"  src={compania.img} />
                    </div>  
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Titulo:</h6>
                        <input className="text-muted bg-light mt-4 mb-3"
                        value={input.title}
                        onChange={handleChange}
                        name='title'></input>
                    </div>
                    <div className="row px-3 form-group"> 
                        <h6 className="mb-0">Descripción:</h6>
                        <textarea className="text-muted bg-light mt-4 mb-3" placeholder="Agrega una descripción a tu publicación"
                         value={input.description}
                         onChange={handleChange}
                         name='description'></textarea>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Imagen:</h6>
                        <input type='text' className="text-muted bg-light mt-4 mb-3"
                        value={input.img}
                        onChange={handleChange}
                        name='img'></input>
                    </div>
                    <div className="row px-3 form-group">
                        <h6 className="mb-0">Dolares:</h6>
                        <select onChange={e => handleSelect(e)}className="text-muted bg-light mt-4 mb-3">
                        <option className="text-muted bg-light mt-4 mb-3" selected >Selecciona</option>
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
                        <h6 className="mb-0">Technologias:</h6>
                        <select onChange={e => handleSelectTwo(e)}className="text-muted bg-light mt-4 mb-3">
                            {
                                technologies?.map(el => 
                                    <option key={el._id} className="text-muted bg-light mt-4 mb-3" value={el.name}>{el.name}</option>
                            )}
                        </select>
                    </div>
                        <button className="btn btn-outline-dark px-4">Publicar</button>
                    </div>
                </div>
            </div>
    ) : ( 
        "... cargando "
        )
};

export default CreatePublications;
