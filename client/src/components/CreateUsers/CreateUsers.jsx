import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/actions';
 

const CreateUsers = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState ({
        name: "",
        lastname: "",
        gmail: "",
        github: "",
        photo: "",
        gender: "",
        phone: "",
        languages: [],
        technologies: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    };
    

    function handleSelectLanguages(e) {
        setInput({
            ...input,
            languages: [...input.languages, e.target.value]
        })
    };

    function handleSelectTechnologies(e) {
        setInput({
            ...input,
            technologies: [...input.technologies, e.target.value]
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postUser(input))
        setInput({
            name: "",
            lastname: "",
            gmail: "",
            github: "",
            photo: "",
            gender: "",
            phone: "",
            languages: [],
            technologies: []
        })
    };

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <h1>Your profile</h1>
                    <h3>it's easy and fast.</h3>
                </div>
                <div>
                    <label>Name:</label> 
                    <input type='text'
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Lastname:</label> 
                    <input type='text'
                    value={input.lastname}
                    name='lastname'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gmail:</label> 
                    <input type='text'
                    value={input.gmail}
                    name='gmail'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Github:</label> 
                    <input type='text'
                    value={input.github}
                    name='github'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Photo:</label> 
                    <input type='text'
                    value={input.photo}
                    name='photo'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gender:</label> 
                    <input type='text'
                    value={input.gender}
                    name='gender'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone:</label> 
                    <input type='text'
                    value={input.phone}
                    name='phone'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Languages:</label> 
                    <select onChange={e => handleSelectLanguages(e)}>
                    <option value='english'>English</option>
                    <option value='spanish'>Spanish</option>
                    <option value='other'>Other</option>
                    </select>
                </div>
                <div>
                     <label>Technologies:</label> 
                    <select onChange={e => handleSelectTechnologies(e)}>
                    <option value='javascript'>Javascript</option>
                    <option value='java'>Java</option>
                    <option value='phyton'>Phyton</option>
                    <option value='c++'>C++</option>
                    <option value='c'>C</option>
                    </select>
                    
                </div>
               <div>
                    <button type='submit'>Register</button>
               </div> 
            </form>
        </div>
    )
}

export default CreateUsers;
