import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Spinner from '../Spinner';
const containerStyle = {
  width: '100%',
  height: '350px'
};

const initialMarkerPosition = {
  lat: -17.1305741,
  lng: -64.1755917
};

const MapComponent = ({ onMarkerPositionChange,zoom,lat,lng,marker }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });
  if (lat){
    initialMarkerPosition.lat=lat
    initialMarkerPosition.lng=lng
  }

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);


  const handleMarkerClick = (e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    if (marker){
      setMarkerPosition(clickedLatLng);
      onMarkerPositionChange(clickedLatLng); 
    }
  };
  if (!isLoaded) {
    return <Spinner></Spinner>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialMarkerPosition}
      zoom={zoom}
      onClick={handleMarkerClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default MapComponent;
