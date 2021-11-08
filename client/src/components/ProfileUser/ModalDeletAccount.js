import React from "react";
import { useDispatch } from "react-redux";
import { deleteJuniors } from "../../redux/actions";

const ModalDeletAccount = ({ infoUser }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-danger"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Borra Tu Cuenta
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Eliminar Cuenta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Estas seguro que deseas eliminar tu cuenta? esto no se podra
              revertir y perderas todos los datos.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-block btn-outline-dark"
                data-bs-dismiss="modal"
              >
                No Eliminar
              </button>
              <button
                onClick={()=>{
                   console.log(infoUser);
                   dispatch(deleteJuniors(infoUser.idUser))
                  }}
                type="button"
                className="btn btn-block btn-outline-danger"
              >
                Si Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletAccount;
