import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCompanyDetails } from "../../redux/actions";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  
} from "@react-google-maps/api";


import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

let company= [
  {
    _id: "618d3fd84f336360bbe17ef4",
    name:"Clinica Soler",
    lat: -34.68784,
    lng: -58.50175,
  },
  {
    _id: "618d5563e7803ae26b3dc381",
    name:"Ailin Rutchle",
    lat: -33.17607,
    lng: -68.47444,
  },
  {
    _id: "618c0cc3a8707bd5e8e32f8f",
    name:"Ailin",
    lat: -33.10607,
    lng: -68.49444,
  },
  {
    _id: "618c1d35b44f427e9f2a739b",
    name:"Pamela Pereyra",
    lat: -31.43292,
    lng: -64.13212,
  },
  {
    _id: "618bdfe96cfb2d7b1d953cb7",
    name:"Maxi Gadea",
    lat: -31.635292,
    lng: -64.36212,
  },
  {
    _id: "618be0dd4b71ca6e252daacb",
    name:"Guille Tempo",
    lat: -32.435292,
    lng: -64.16212,
  },
  {
    _id: "618c1580357f915ca70270b0",
    name:"María Angélica Rojas Fernández",
    lat: -34.62254,
    lng: -58.36550,
  },
  {
    _id: "618c1d69b13c6eafa0a0abf6",
    name:"Jesuan Patermina",
    lat: -34.62254,
    lng: -58.35550,
  },
  
];


const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "38vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};



export default function Mapa() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyDetails(id))
  }, [dispatch]);

  const companies = useSelector(state => state.details)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo",
    libraries
  });
 
  //createLocationMarkers();
 console.log('nombre ' + companies.name)
  const center = {
        lat: -34.13091,
        lng: -63.38324,
        //lat: companies.lat,
        //lng: companies.lng,
  };
  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

 
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h2>
        Empresas{" "}
        <span role="img" aria-label="tent">
        👩‍💻
        </span>
      </h2>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        
        onLoad={onMapLoad}
      >
               

        {company?.map((marker) => (
          id && id===marker._id ? (
          <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
            
              icon={{
                url: `/company.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
          />
          ) : null
         
        
        ))}
           
      </GoogleMap>
    </div>
  );
}
