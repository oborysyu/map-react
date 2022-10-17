import { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import s from "./Map.module.css";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: "400px",
  height: "600px",
};

const defaultMapConfig = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: defaultTheme,
};

const Map = ({ center, markers }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div className={s.mapcontainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapConfig}
      >
        {markers.map(({ id, place, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{place}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        {markers.map((item, index, arr) => {
          let path =
            index === arr.length - 1
              ? []
              : [item.position, arr[index + 1]?.position];
          return (
            <Polyline
              key={index}
              options={{
                path,
                strokeWeight: 1,
                strokeColor: "#ff8d1f",
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export { Map };
