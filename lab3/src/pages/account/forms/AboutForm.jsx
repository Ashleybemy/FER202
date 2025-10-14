import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AboutForm({ onNext }) {
  const [values, setValues] = useState({ first: '', last: '', email: '', phone: '', age: '', avatar: null });
  const [touched, setTouched] = useState({});

  const invalid = (k) => touched[k] && !values[k];
  const set = (k, v) => setValues((s)=>({ ...s, [k]: v }));

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label><i className="bi bi-person-circle me-1" /> First Name</Form.Label>
          <Form.Control isInvalid={invalid('first')} value={values.first} onChange={(e)=>set('first', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control isInvalid={invalid('last')} value={values.last} onChange={(e)=>set('last', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" isInvalid={invalid('email')} value={values.email} onChange={(e)=>set('email', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={3}>
          <Form.Label>Phone</Form.Label>
          <Form.Control isInvalid={invalid('phone')} value={values.phone} onChange={(e)=>set('phone', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={3}>
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" isInvalid={invalid('age')} value={values.age} onChange={(e)=>set('age', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={(e)=>set('avatar', e.target.files?.[0] || null)} />
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            const keys = ['first','last','email','phone','age'];
            const t = {}; keys.forEach(k => t[k] = true);
            setTouched(t);
            const ok = keys.every(k => values[k]);
            if (ok) onNext?.();
          }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}
