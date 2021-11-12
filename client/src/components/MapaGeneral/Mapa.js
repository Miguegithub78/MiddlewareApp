import React from "react";
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
import { Link } from "react-router-dom";
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
    lat: -33.00607,
    lng: -68.59444,
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
  height: "90vh",
  width: "90vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: -34.28421,
  lng: -64.16724,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  console.log('onclick lat + lng ' + markers)

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        
      },
      
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    console.log('search lat' + lat + 'lng' + lng)
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h2>
        Companies{" "}
        <span role="img" aria-label="tent">
        👩‍💻
        </span>
      </h2>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {company?.map((marker) => (
          
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
           
            onClick={() => {
              setSelected(marker);
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
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="companies">
                  💻
                </span>{" "}
                <Link to={`/companies/${selected._id}`} key={selected.name}>{selected.name}</Link>
                
              </h2>
              
             
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
            console.log('Mi ubicacion lat ' + position.coords.latitude + 'lng ' + position.coords.longitude)
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
      location: { lat: () => -34.60364, lng: () => -58.38159 },
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
