import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from "../../redux/actions";
import { useEffect, useState } from "react";

export default function CompanyDetail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetails(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const companyFound = useSelector((state) => state.details)
    return (
        <div>

            <div>
                <div>
                    <h1>{companyFound.name}</h1>
                    <img src={companyFound.photograph} alt="Imagen no encontrada" width="100px" heigth="80px" ></img>
                </div>
            </div>

        </div>
    )
}