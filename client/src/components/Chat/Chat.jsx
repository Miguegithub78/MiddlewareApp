import React, {useState, useEffect} from 'react'
import { db } from '../../firebaseConfig'
import { collection, getDocs, getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useSelector } from 'react-redux'

export default function Chat(){

	const user = useSelector(state => state.user)

	var [message, setMessage] = useState('')
	var [state, setState] = useState({

		messages: []
	})

	function onChangeState(e){
		setMessage(e.target.value)
	}

	async function handleSubmit(e){
		e.preventDefault()
		if(message == '') return alert("No puedes enviar un mensaje vacio")
		const list = !state.messages ? [] : state.messages
		const newMessage = {
			from: "",
			to: "",
			id: !state.messages ? 0 : state.messages.length,
			text: message
		}
		list.push(newMessage)
		setMessage('')

		// Aqui envia los datos a firebase
		try{

			await setDoc(doc(db, "messages", "eKzS1r3whihVuzfWeIl9"), {
				chat: list
			});
		}
		catch(err){
			console.log(err.message)
		}
	}

	// esta funcion va a estar escuchando los cambios en firebase
	const unsub = onSnapshot(doc(db, "messages", "eKzS1r3whihVuzfWeIl9"), (doc) => {
		
		if(state.messages && doc.data() !== undefined){

			if(state.messages.length < doc.data().chat.length){
				setState({messages: doc.data().chat});
			}
		}
	});

	//Pide los datos apenas se carga la pagina o el chat
	useEffect(async()=>{
		
		const docRef = doc(db, "messages", "eKzS1r3whihVuzfWeIl9");
		const docSnap = await getDoc(docRef);
		let list = docSnap.data()
		console.log(docSnap.data())

		setState({
			messages: docSnap.data() !== undefined ? docSnap.data().chat : []
		})
		console.log(state)
	}, []);

	

	return (

		<div>

			<h3>Hello world</h3>

			<ul>
			{
				state.messages ? state.messages.map((e, i) => 

					<li key={i}>{e.text}</li>
				) : <h1>Cargando...</h1>
			}
			</ul>

			<form onSubmit={handleSubmit}>
				<input type="text" value={message} placeholder="Escríbe algo..." onChange={(e)=>onChangeState(e)} />
				<input type="submit"/>
			</form>
		</div>
	)
}