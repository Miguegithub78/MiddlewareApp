import React from "react";
//import { useSelector } from 'react-redux';
import "./MapGoogle.css";

export const CardsJuniors = ({ arrayJuniors }) => {

    return (
    <>
    <div className="">
        <input type="text" id="autocomplete">Direccion</input>
    </div>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo&libraries=places"></script>
    <script src="main.js?version=1.2"></script>
    <script src="localizacion.js"></script>
    </>
)}