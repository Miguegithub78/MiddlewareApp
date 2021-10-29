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
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-opacity-60">
			<div className="container-fluid">

				<Link className={`navbar-brand ${styles.logo}`} to="/home">Middleware</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
						{user && user.type === "junior" ? (
							<li className="nav-item">
								<a className="nav-link" aria-current="page" href="#">Puente de los sueños</a>
							</li>
						) : null}
						<li className="nav-item">
							<a className="nav-link" aria-current="page" href="#">Empleos</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Mis empleos</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Mis postulaciones</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Tips</a>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{user ? user.name : "Usuario"}
							</a>
							<ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
								<li><Link className="dropdown-item" to={`/profileuser/1`}>Mi perfil</Link></li>
								<li><hr className="dropdown-divider" /></li>
								<li><button className="dropdown-item" onClick={() => dispatch(logOutUserAction())}>Cerrar sesión</button></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	);
}

export default NavBar;
