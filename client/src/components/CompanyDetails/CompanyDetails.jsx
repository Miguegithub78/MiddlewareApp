import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from "../../redux/actions";
import { useEffect } from "react";

export default function CompanyDetail(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetails(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const companyFound = useSelector((state) => state.details)
    return (
        <div>
            {
                companyFound.length > 0 ?

                    <div>
                        <div>
                            <h1>{companyFound.name}</h1>
                            <img src={companyFound.photograph} alt="Imagen no encontrada" width="100px" heigth="80px" ></img>
                            <h3>{companyFound.webpage}</h3>
                            <h3>{companyFound.gmail}</h3>
                            <h3>{companyFound.country}</h3>
                            <h3>{companyFound.state}</h3>
                            <h3>{companyFound.city}</h3>
                            <h3>{companyFound.description}</h3>
                        </div>
                    </div> : <p>Loading...</p>
            }
            <div>
                <Link to='/home'>
                    <button>Volver</button>
                </Link>

            </div>
        </div>
    )
}