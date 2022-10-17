import "./App.css";
import { Map } from "./components/Map";
import { Autocomplete } from "./components/Autocomplete";
import { WaypointsPanel } from "./components/WaypointsPanel/WaypointsPanel";
import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 50.450001,
  lng: 30.523333,
};

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const onMapSelection = (coordinates, desc) => {
    onPlaceSelect(coordinates);
    setMarkers([
      ...markers,
      { place: desc, id: Date.now(), position: coordinates },
    ]);
  };

  const onPlaceRemove = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
  };

  return (
    <div className="App">
      <div className="left-panel">
        <Autocomplete isLoaded={isLoaded} onSelect={onMapSelection} />
        {markers.length > 0 ? (
          <WaypointsPanel places={markers} onRemove={onPlaceRemove} />
        ) : null}
      </div>
      {isLoaded ? (
        <Map center={center} markers={markers} />
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}

export default App;
