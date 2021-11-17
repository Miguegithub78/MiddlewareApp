import React from "react";
import { useEffect, useState } from 'react';
import Checkout from './Checkout';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mercadoPagoAction, getUserAction } from '../../redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


export default function MercadoPago(){

  // const [dates, setDates] = useState("");
	const dispatch = useDispatch();
	const plan = useSelector((state) => state.plan);
	const { id, product } = useSelector((state) => state.mercadoPago);
	const user = useSelector((state) => state.user);
	const history = useHistory();
	const { idJob } = useParams();
	useEffect(() => {
		dispatch(mercadoPagoAction(idJob, plan));
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

  return (
    <div className="MercadoPago">
      { !id ? <p>Cargando...</p> : <Checkout product={product} dates={id} /> }
    </div>
      
  )
}

