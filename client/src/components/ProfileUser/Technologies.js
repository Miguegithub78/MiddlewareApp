// import React from "react";
import { useSelector } from "react-redux";

const Technologies = ({ setInfoUser, infoUser }) => {
  const { technologies, user } = useSelector((state) => state);

  const handleSelectTechnologies = (tech) => {
    setInfoUser((r) => {
      if (!r.technologies.length === 0)
        return { ...r, infoUserChanged: true, technologies: [tech] };
      if (!r.technologies.includes(tech)) {
        return {
          ...r,
          infoUserChanged: true,
          technologies: [...r.technologies, tech],
        };
      } else {
        const filter = r.technologies.filter((c) => c._id !== tech._id);
<<<<<<< HEAD
        return { ...r, infoUserChanged: true, technologies: filter };
=======
        return { ...r, technologies: filter };
>>>>>>> main
      }
    });
  };
  return (
    <>
      {technologies.map((tec, i) => (
        <span key={i}>
          <input
            style={{ focus: "none" }}
            type="checkbox"
            className="btn-check btn-checkbox-focus"
            id={tec._id}
<<<<<<< HEAD
            defaultChecked={
              infoUser.technologies.find((e) => e._id === tec._id)
                ? true
                : false
            }
=======
            checked={infoUser.technologies.find(e=>e._id===tec._id)?true:false}
>>>>>>> main
          />
          <label
            className="btn btn-outline-dark m-1 btn-checkbox-focus"
            htmlFor={tec._id}
            style={{ padding: "1px 5px" }}
            onClick={() => handleSelectTechnologies(tec)}
          >
            {tec.name}
          </label>
        </span>
      ))}
    </>
  );
};

export default Technologies;
