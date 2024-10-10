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
  import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const AlertMap = ({ referenceCoords }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [alertShown, setAlertShown] = useState(new Set()); 
  
  useEffect(() => {
    // Función para obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);

        // Compara la ubicación del usuario con las coordenadas de referencia
        checkProximity(latitude, longitude);
        
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
      },
      { enableHighAccuracy: true } 
    );
     // Función para verificar la proximidad
     const checkProximity = (latitude, longitude) => {
      const threshold = 0.01; // Ajusta este valor según tu necesidad
      for (const coord of referenceCoords) {
        const [refLat, refLng] = coord;
        const distance = Math.sqrt(
          Math.pow(latitude - refLat, 2) + Math.pow(longitude - refLng, 2)
        );
         // Crear una clave única para la referencia
         const key = `${refLat},${refLng}`;
         if (distance <= threshold && !alertShown.has(key)) {
           alert(`¡Estás cerca de la coordenada de referencia: ${key}!`);
           alertShown.add(key); // Agregar la coordenada al Set
           setAlertShown(new Set(alertShown)); // Actualizar el estado
        }
      }
    };
  }, [referenceCoords]);

  
 

  return (
    <MapContainer center={userPosition || [21.88814023813352, -102.2922891518753]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userPosition && <Marker position={userPosition} />}
    </MapContainer>
  );
};

// Usar el componente
const MapView = () => {
  // Define tus coordenadas de referencia aquí
  const referenceCoords = 
  [[21.8915, -102.2505],
  [21.8929, -102.2521],
  [21.8933, -102.2507],
  [21.8911, -102.2528],
  [21.8920, -102.2501]]
   

  return (
    <div>
        
      <h1>Mapa con Alertas</h1>
      <AlertMap referenceCoords={referenceCoords} />
    </div>
  );
};

export default MapView;
