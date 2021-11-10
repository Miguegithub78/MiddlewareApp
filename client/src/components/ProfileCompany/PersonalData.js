import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftData from "./LeftData";
import SensitiveData from "./SensitiveData";
// import Languages from "./Languages";
// import Technologies from "./Technologies";

const PersonalData = ({ infoUser, setInfoUser, user }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      [e.target.name]: e.target.value,
    }));
  };
  const [editValue, setEditValue] = useState(true);

  //en cada edicion de datos tiene que viajar a la db
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(infoUser(infoUser));
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <LeftData
              user={user}
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              editValue={editValue}
            />
          </div>
          <div className="col-sm-9 text-rigth">
            <SensitiveData
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              editValue={editValue}
              setEditValue={setEditValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
