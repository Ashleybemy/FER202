import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AddressForm({ onPrev }) {
  const [values, setValues] = useState({ street: '', city: '', country: '', zip: '' });
  const [touched, setTouched] = useState({});

  const invalid = (k) => touched[k] && !values[k];
  const set = (k, v) => setValues((s)=>({ ...s, [k]: v }));

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Street</Form.Label>
          <Form.Control isInvalid={invalid('street')} value={values.street} onChange={(e)=>set('street', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>City</Form.Label>
          <Form.Control isInvalid={invalid('city')} value={values.city} onChange={(e)=>set('city', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Country</Form.Label>
          <Form.Select isInvalid={invalid('country')} value={values.country} onChange={(e)=>set('country', e.target.value)}>
            <option value="">Choose...</option>
            <option>USA</option>
            <option>UK</option>
            <option>Vietnam</option>
            <option>France</option>
            <option>Japan</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control isInvalid={invalid('zip')} value={values.zip} onChange={(e)=>set('zip', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button
          variant="success"
          onClick={() => {
            const keys = ['street','city','country','zip'];
            const t = {}; keys.forEach(k => t[k] = true);
            setTouched(t);
            const ok = keys.every(k => values[k]);
            if (ok) alert('Finish! (demo)');
          }}
        >
          Finish
        </Button>
      </div>
    </Form>
  );
}
