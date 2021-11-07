import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePictureProfileAction } from "../../redux/actions";

const ChangePicture = ({ setInfoUser }) => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);

  const handleChangePicture = (e) => {
    const picture = e.target.files[0];
    setPicture(picture);
  };
  const handlePictureClick = () => {
    if (picture) {
      setInfoUser((info) => ({
        ...info,
        infoUserChanged: true,
      }));
      dispatch(changePictureProfileAction(picture));
    }
  };
  return (
    <>
      <div className="height-10 d-flex mt-2 justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Upload
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Subiendo Foto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="body-desc">
                It will be easier for your friends to recognize you if you
                upload your real photo. You can upload the image in JPG, GIF or
                PNG format.
              </p>
              <div className="photo-input">
                <input
                  type="file"
                  id="loadFile"
                  onChange={handleChangePicture}
                />
                <button
                  className="btn mt-3 btn-sm btn-primary"
                  onClick={handlePictureClick}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Elegir archivo
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <p className="footer-title">
                If you're having problems uploading, try choosing a smaller
                photo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePicture;
