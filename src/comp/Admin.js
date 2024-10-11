import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Modal, Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';

const AlertMap = ({ referenceCoords }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [alertShown, setAlertShown] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [direccion, setDireccion] = useState('');

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        checkProximity(latitude, longitude);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
      },
      { enableHighAccuracy: true }
    );
  }, [referenceCoords]);

  const checkProximity = (latitude, longitude) => {
    const threshold = 0.01;
    for (const coord of referenceCoords) {
      const [refLat, refLng] = coord;
      const distance = Math.sqrt(
        Math.pow(latitude - refLat, 2) + Math.pow(longitude - refLng, 2)
      );
      const key = `${refLat},${refLng}`;
      if (distance <= threshold && !alertShown.has(key)) {
        obtenerDireccion(refLat, refLng); // Obtiene la dirección de la coordenada cercana
        alertShown.add(key);
        setAlertShown(new Set(alertShown));
      }
    }
  };

  const obtenerDireccion = (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.address) {
          const direccion = `${data.address.road || 'Calle desconocida'}, ${data.address.postcode || 'Sin CP'}, ${data.address.city || data.address.town || 'Ciudad desconocida'}`;
          setDireccion(direccion);
          setShowModal(true);
        } else {
          console.error("No se encontró la dirección.");
        }
      })
      .catch(error => {
        console.error("Error al obtener la dirección: ", error);
      });
  };

  return (
    <>
      <MapContainer center={userPosition || [21.88814023813352, -102.2922891518753]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userPosition && <Marker position={userPosition} />}
      </MapContainer>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Estás cerca de una coordenada de referencia!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Dirección: {direccion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" href='/Description.js'>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const MapView = () => {
  const referenceCoords = [
    [21.8915, -102.2505],
    [21.9592, -102.2664],
    [21.9591, -102.2664],
    [21.8929, -102.2521],
    [21.8933, -102.2507],
    [21.8911, -102.2528],
    [21.8920, -102.2501]
  ];

  return (
    <div>
      <h1>Mapa con Alertas</h1>
      <AlertMap referenceCoords={referenceCoords} />
    </div>
  );
};

export default MapView;


/* import React from "react";
import { MapContainer, TileLayer, useMap, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapView() {
   
    const center = [21.88814023813352, -102.2922891518753]
    const fillBlueOptions = { fillColor: 'blue' }
    return (
        
        <>
        <MapContainer center={[21.88814023813352, -102.2922891518753]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                 <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
        </MapContainer>
        </>
        
        
    );

  }
  
  export default MapView; */