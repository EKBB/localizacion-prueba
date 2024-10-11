import React from "react";
import { Button, Card, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function Description() {
  return (
      <>
       <Card>
        <Card.Body>
            <Card.Title>Detalles de Reportes Previos</Card.Title>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton id="tbg-radio-1" value={1}>
                Violacion de Manuel
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
                    <Form.Control as="textarea" rows={3} placeholder="Vi como tres personas lo tocaban" />
                    </Form.Group>
            </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
            <Card.Title>¿Necesitas agregar mas detalles a tu reporte?</Card.Title>
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
                    <Button href="/">Aceptar</Button>
            </Form>
        </Card.Body>
      </Card>
      </>
  );
}

export default Description;
