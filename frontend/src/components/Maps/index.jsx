import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { toast } from 'react-toastify';

import { FaCrosshairs } from 'react-icons/fa';

import { MapContainer, Row, Divider, CentralizeButton } from './styles';

function Maps({ routes }) {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [directions, setDirections] = useState(null);

  async function calculateRoute() {
    const directionService = new window.google.maps.DirectionsService();
    try {
      const results = await directionService.route({
        origin: routes.starting_address,
        destination: routes.destiny_address,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setDirections(results);
      setDuration(results.routes[0].legs[0].duration.text);
      setDistance(results.routes[0].legs[0].distance.text);
    } catch (error) {
      toast.error('Não foi possível calcular a rota');
      console.error(error);
    }
  }

  /*
   *  Calculate route when the component is mounted
   */

  useEffect(() => {
    if (map && routes) {
      calculateRoute();
    }
  }, [map]);

  /*
   *  Gets locale coordinates for setting the map center
   */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        toast.warn('Não foi possível obter a localização');
      }
    );
  }, []);

  return (
    <>
      <Row mb={15}>
        <span>
          <strong>Duração:</strong> {duration}
        </span>
        <span>
          <strong>Distância:</strong> {distance}
        </span>
      </Row>
      <Divider />
      <MapContainer>
        <CentralizeButton className="icon" onClick={() => map.panTo(center)}>
          <FaCrosshairs size={18} />
        </CentralizeButton>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
          }}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </MapContainer>
    </>
  );
}

export default Maps;
