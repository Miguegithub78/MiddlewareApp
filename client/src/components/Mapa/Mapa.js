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

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import "./index.css";
const libraries = ["places"];
const mapContainerStyle = {
  height: "70vh",
  width: "80vw",
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
let cont =0;

export default function Mapa() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo",
    libraries
  });


  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
    
  
  const onMapClick = useCallback((e) => {
    
    console.log('contador' + cont)
    if(cont===0){
      cont=cont+1;
    setMarkers((current) => [
       
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          
        },  
      ]);
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    if(cont===0){
      cont=cont+1;
      setMarkers((current) => [
       
        ...current,
        {
          lat: lat,
          lng: lng,
          
        },  
      ]);
    }
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              cont=0;
              setMarkers([]);
            }}
            icon={{
              url: `/company.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setMarkers([]);
            }}
          >
            <div>
              <h3>
                <span role="img" aria-label="company">
                  💻
                </span>{" "}
                Company
              </h3>
              
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              
            });
            console.log('mi ubicacion' + position.coords.latitude, position.coords.longitude)
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
