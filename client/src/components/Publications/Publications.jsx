import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPublications, putPublications } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import s from './Publications.module.css';

export default function Publication(){

    const dispatch = useDispatch();
    const publications = useSelector(state => state.publications)

    var [state, setState] = useState(true)
    var [payload, setpayload] = useState({
        description: ''
    })
    var [idPost, setIdPost] = useState(null)

    var refVentanaEmergente = useRef(null)


    useEffect(()=>{
        dispatch(getPublications())
    }, [])

    function VentanaEmergente(id){
        state ? setState(false) : setState(true)
        if(id){
            setIdPost(id)
        }
    }

    function updateDescription(){
        
        if(payload.description !== ''){

            dispatch(putPublications(idPost, payload))
            window.location.reload(true);
        }
    }

    function handleOnChangeUpdate(){
        setpayload({
            description: refVentanaEmergente.current.value
        })
    }

    return (
        <div>
            <NavBar />
                <div className={s.cards}>
                    {
                        publications ? publications.map((e, i) => 

                        <div className={e.junior ? s.cardJunior : s.cardCompany}>
                            
                            <div className={s.name}>
                                <span>{e.junior ? e.junior.name : e.company.name}  <span className={s.spanPequeño}>{e.junior ? "Junior" : "Empresa"}</span></span>  
                            </div>

                            <div className={s.description}>
                                <span>{e.description}</span>
                            </div>

                            <div>
                                <img className={s.img} src={e.photograph ? e.photograph : "https://i.pinimg.com/736x/44/ca/1d/44ca1db525ebc3a45bbe815633d7b9b1.jpg"} alt="Imagen del post" />
                            </div>

                            <div className={s.divButton}>
                                <button className={e.junior ? s.btnPink : s.btnBlue} onClick={()=>VentanaEmergente(e._id)}>Editar</button>
                            </div>
                            
                        </div>

                       

                        ) : <h1>Cargando...</h1>
                    }
                </div>
                    
                        
                    <div className={state ? s.ventanaEmergenteOculta : s.ventanaEmergenteVisible}>
                        <div className={state ? s.cuadradoDelInputOcultar : s.cuadradoDelInput}>

                            <input type="text" placeholder="Descripción" ref={refVentanaEmergente} onChange={()=>handleOnChangeUpdate()} />
                            
                            <div className={s.btnInput}>
                                <button onClick={()=>{updateDescription(); VentanaEmergente()}}>Aceptar cambios</button>
                            </div>

                        </div>
                    </div>
                
                
        </div>
    )
}