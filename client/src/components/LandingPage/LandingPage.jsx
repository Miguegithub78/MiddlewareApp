import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginImage from "./image.png";
import Image from "./image2.jpg"

import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getUserAction } from "../../redux/actions";
import Error from "../Login/Error";

export default function LandingPage() {
  const { user, errorLogin } = useSelector((state) => state);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user && userFirebase.emailVerified)
        dispatch(getUserAction(userFirebase));
    }
  });

  return (
    <div className="langing mt-5">
      <div className="container">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-md-1">
          <div class="container">
            <a class="navbar-brand" href="#">Middleware</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <div class="mx-auto"></div>
              <ul class="navbar-nav">

                <li class="nav-item">
                  <a class="nav-link text-white" href="#row-servicios">Servicios</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#row-nosotros">Sobre nosotros</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link text-white" href="#row-contacto">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="d-flex flex-column justify-content-center h-100">
              <h1 className="d-md-block d-none">Middleware</h1>
              <h2 className="d-md-none">Middleware</h2>
              <h5>Un puente entre empresas y programadores</h5>
              {user ? (
                user.userType === "juniors" ? (
                  <Link
                    className="btn btn-block btn-dark btn-outline-light me-2"
                    to="/login/juniors"
                  >
                    Programador Jr
                  </Link>
                ) : (
                  <Link
                    className="btn btn-block btn-dark btn-outline-light"
                    to="/login/companies"
                  >
                    Empresa
                  </Link>
                )
              ) : (
                <div>
                  <Link
                    className="btn btn-block btn-dark btn-outline-light me-2"
                    to="/login/juniors"
                  >
                    Programador Jr
                  </Link>
                  <Link
                    className="btn btn-block btn-dark btn-outline-light"
                    to="/login/companies"
                  >
                    Empresa
                  </Link>
                </div>
              )}
              {errorLogin && (
                <div className="mt-3">
                  <Error msg={errorLogin} />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12  d-none d-sm-block">
            <img
              src={LoginImage}
              alt="Login Image"
              className={` ${styles.loginImage}`}
            />
          </div>
        </div>



        <div className="row" id="row-servicios">
          <div className="col-lg-12 text-center">
            <h2 className="display-4">Servicios</h2>
          </div>


          <div className="row">

            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">

              <div className="card text-center">
                <i className="fa fa-instagram fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="card-title">
                    <h5>Instagram</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>
                </div>


              </div>

            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">

              <div className="card text-center">
                <i className="fa fa-twitter fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>Twitter</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>
                </div>
              </div>

            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">
                <i className="fa fa-facebook fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>Facebook</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>

                </div>

              </div>
            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="fa fa-pinterest-p fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="title">
                    <h5>Pinterest</h5>
                  </div>

                  <div className="text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>
                </div>

              </div>
            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="fa fa-google-plus fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="card-title">
                    <h5>Google</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>
                </div>
              </div>
            </div>





            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="fa fa-github fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>Github</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>


        </div>
        <div className="row" id="row-nosotros">
          <div className="col-sx-12 text-center d-sm-none">
            <h2 className="display-4">Sobre nosotros</h2>
          </div>
          <div className="col-xs-12 d-sm-none">
            <div className="card text-center">




              <div className="card-body" >
                <div className="card-text">
                  <p>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 text-center d-sm-block d-none">
            <h2 className="display-4">Sobre nosotros</h2>
          </div>
          <div className="col-sm-12 col-xs-12 text-center d-sm-block d-none">
            <div className="card">
              <div className="fade-out-right text-center" >
                <div className="row g-0 ">
                  <div className="col">

                    <img
                      src={Image}
                      alt="Login Image"
                      className="img-fluid rounded-start"
                    />

                  </div>
                  <div className="col-md-8" >
                    <div className="card-body" >

                      <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui adLorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="" id="row-contacto">
        <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 mt-5">
          <div className="container text-center">
            <small>Contacto con los administradores</small>
          </div>

        </footer>
      </div >
    </div >
  );
}
