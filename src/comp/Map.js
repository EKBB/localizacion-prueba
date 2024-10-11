import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';

const AlertMap = ({ referenceCoords }) => {
  const [showModal, setShowModal] = useState(false);
  const [direccion, setDireccion] = useState('');

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
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
      if (distance <= threshold) {
        obtenerDireccion(refLat, refLng); // Obtiene la dirección de la coordenada cercana
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Ya hay un Reporte cerca de tu localizacion:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Dirección: {direccion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Crear nuevo reporte
          </Button>
          <Button variant="primary" href='/Detalles'>
            Complementar Reporte
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const MapView = () => {
  const referenceCoords = [
    [21.8436, -102.2602],
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
      <h1>Reporte</h1>
      <Card>
        <Card.Body>
            <Card.Title>Tipo de Reporte</Card.Title>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton id="tbg-radio-1" value={1}>
                Violacion
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={2}>
                Robo
                </ToggleButton>
                <ToggleButton id="tbg-radio-3" value={3}>
                Pelea
                </ToggleButton>
            </ToggleButtonGroup>
            <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button href="/">Reportar</Button>
            </Form>
        </Card.Body>
      </Card>
      <AlertMap referenceCoords={referenceCoords} />
    </div>
  );
};

export default MapView;
