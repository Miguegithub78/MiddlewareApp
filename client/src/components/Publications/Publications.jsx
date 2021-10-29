import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPublications } from '../../redux/actions/index';

export default function Publication(){

    const publications = useSelector(state => state.publications)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPublications())
    }, [])

    return (
        <div>
            {
                publications ? publications.map(e => 
                <div>
                    <span>{e.junior ? e.junior.name : e.company.name}</span>

                </div>
                ) : <h1>Cargando...</h1>
            }
        </div>
    )
}