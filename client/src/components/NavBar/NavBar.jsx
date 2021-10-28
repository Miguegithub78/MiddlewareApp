import React from 'react';

import s from './NavBar.module.css';
function NavBar() {
	/* let user = { type: 'business', name: 'MercadoLibre', img: '' }; */
	let user = { type: 'developer', name: 'Hernan Gonzalez', img: '' };

	return (
		<nav className={s.nav_container}>
			<div className={s.nav_container_logo}>
				<h1 className={s.nav_logo}>Middleware</h1>
			</div>
			{user.type === 'developer' ? (
				<div className={s.nav_puente}>Puente de los sueños</div>
			) : null}
			<div className={s.nav_container_links}>
				<p className={s.nav_link}>Empleos</p>
				<p className={s.nav_link}>Ver Empresas</p>
				<p className={s.nav_link}>Mis postulaciones</p>
				<p className={s.nav_link}>Tips</p>
			</div>
			<div className={s.nav_container_perfil}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					class='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fill-rule='evenodd'
						d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
						clip-rule='evenodd'
					/>
				</svg>
				{<p>{user.name}</p>}
				<svg
					className={s.arrow}
					xmlns='http://www.w3.org/2000/svg'
					class='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M19 9l-7 7-7-7'
					/>
				</svg>
				<div className={s.nav_container_perfil_desplegable}>
					<p>Mi perfil</p>
					<p>Log out</p>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
