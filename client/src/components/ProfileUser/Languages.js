import React from "react";
import { useSelector} from 'react-redux'



const Languages = ({setInfoUser, infoUser}) => {
  
  const { languages, technologies, user } = useSelector((state) => state);
  
  const handleSelectLanguages = (e) => {
    setInfoUser((infoUser) => ({
      ...infoUser,
      languages: [...infoUser.languages, e.target.value],
    }));
  }
  return (
    <div>
      <label>Idiomas: </label>
      <select onChange={handleSelectLanguages}>
        {languages.map((el) => (
          <option key={el._id} value={el.name}>
            {el.name}
          </option>
        ))}
        ;
      </select>
      <ul>
        <li>{infoUser.languages.map((el) => el + ", ")}</li>
      </ul>
    </div>
  );
};

export default Languages;
