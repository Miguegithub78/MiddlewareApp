import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUserAction } from '../../redux/actions'
import styles from "./NavBar.module.css";
function NavBar() {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state);
	const junior = useSelector((state) => state.companies);
	console.log(junior)


	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-100">
			<div className="container-fluid">

				<Link className={`navbar-brand text-primary ${styles.logo}`} to="/home">Middleware</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mx-auto ">
						{user && user.type === "junior" ? (
							<li className="nav-item p-2 ">
								<a className="nav-link" aria-current="page" href="#">Puente de los sueños</a>
							</li>
						) : null}

						<li className={`nav-item  ${styles.items}`}>
							<Link className="nav-link fw-normal " aria-current="page" to="/publicaciones">Publicaciones</Link>

						</li>
						<li className={`nav-item  ${styles.items}`}>
							<a className="nav-link fw-normal " href="#">Mis empleos</a>
						</li>
						<li className={`nav-item  ${styles.items}`}>
							<a className="nav-link fw-normal " href="#">Mis postulaciones</a>
						</li>
						<li className={`nav-item  ${styles.items}`}>
							<a className="nav-link fw-normal " href="#">Tips</a>
						</li>
						<li className={`nav-item dropdown ${styles.items}`}>
							<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{user ? user.name : "Usuario"}
							</a>
							<ul className="dropdown-menu dropdown-menu-start text-right" aria-labelledby="navbarDropdown">
								<li><Link className="dropdown-item " to={`/profileuser/1`}>Mi perfil</Link></li>
								<li><hr className="dropdown-divider" /></li>
								<li><button className="dropdown-item" onClick={() => dispatch(logOutUserAction())}>Cerrar sesión</button></li>
							</ul>
						</li>
					</ul>
				</div>
			</div >
		</nav >

	);
}

export default NavBar;
