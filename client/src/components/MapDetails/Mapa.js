import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

let map;
let infoWindow;
let mark=[];
let companies= [
  {
    name:"Clinica Soler",
    lat: -34.68784,
    lng: -58.50175,
  }
];
const createMarker=(coord,name) => {
  console.log('coord' + coord)
  let html =`<h3>${name}<h3>`
  const marker = new window.google.maps.Marker({
    position:coord,
    map:map,
  })
    window.google.maps.event.addListener(marker,"click", () => { 
      infoWindow.setContent(html);
      infoWindow.open(map.marker)
   })
  mark.push(marker);
}
const createLocationMarkers = () => {
  console.log('arreglo dentro' + companies)
  companies.forEach(companies => {
    let coord = new window.google.maps.LatLng(companies.lat, companies.lng);
    let name = companies.name;
    createMarker(coord, name); 
  })
}



const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "45vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: -34.592164,
  lng: -58.4431,
};


export default function Mapa() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo",
    libraries
  });
 
  //createLocationMarkers();
 
  
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
        zoom={8}
        center={center}
        options={options}
        
        onLoad={onMapLoad}
      >
        {console.log('arreglo' + companies)}
        {createLocationMarkers()}

        {companies?.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            
            icon={{
              url: `/society.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
         
         
        
        ))}
           infoWindow = new google.map.InfoWindow()
      </GoogleMap>
    </div>
  );
}
