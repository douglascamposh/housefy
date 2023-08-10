import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px'
};

const initialMarkerPosition = {
  lat: -17.1305741,
  lng: -64.1755917
};

const MapComponent = ({ onMarkerPositionChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqVvvt2_MGOrhLeNWCx5D0-D1JZ5ZZM4U"
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);


  const handleMarkerClick = (e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkerPosition(clickedLatLng);
    onMarkerPositionChange(clickedLatLng); 
  };
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialMarkerPosition}
      zoom={5}
      onClick={handleMarkerClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default MapComponent;
