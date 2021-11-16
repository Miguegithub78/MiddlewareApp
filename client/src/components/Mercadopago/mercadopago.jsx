import React from "react";
import { useEffect, useState } from 'react';
import Checkout from './Checkout';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mercadoPagoAction, getUserAction } from '../../redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


export default function MercadoPago(){

  // const [dates, setDates] = useState("");
	const dispatch = useDispatch();
	const idMercadoPago = useSelector((state) => state.mercadoPago);
	const user = useSelector((state) => state.user);
	const history = useHistory();
	useEffect(() => {
		dispatch(mercadoPagoAction(user));
		// setDates(idMercadoPago);

	}, []);	

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

 const carrito = [
		{
			id: 1,
			title: "Standar",
			quantity: 1,
			unit_price: 600,
			picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
		},
		{
			id: 2,
			title: "Premium",
			quantity: 1,
			unit_price: 900,
			picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
			
		}
	]
  return (
    <div className="MercadoPago">
      { !idMercadoPago ? <p>Cargando...</p> : <Checkout carrito={carrito} dates={idMercadoPago} /> }
    </div>
      
  )
}

