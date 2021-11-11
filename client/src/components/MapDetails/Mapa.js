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
    id: "618905611ad62578fd8367f1",
    name:"Clinica Soler",
    lat: -34.68784,
    lng: -58.50175,
  },
  {
    id: "618905611ad62578fd8367f2",
    name:"Google",
    lat: -34.660254,
    lng: -58.36698,
  },
  {
    id: "618c0cc3a8707bd5e8e32f8f",
    name:"Ailin Rutchle",
    lat: -33.17607,
    lng: -68.47444,
  },
  {
    id: "618c1d35b44f427e9f2a739b",
    name:"Pamela Pereyra",
    lat: -31.43292,
    lng: -64.13212,
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
        lat: -34.28421,
        lng: -64.16724,
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
        {console.log('lat dentro ' + company)}
        {console.log('arreglo' + companies)}
        

        {company?.map((marker) => (
          id && id===marker.id ? (
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
           infoWindow = new google.map.InfoWindow()
      </GoogleMap>
    </div>
  );
}
