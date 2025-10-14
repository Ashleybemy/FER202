import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function AccountForm({ onPrev, onNext }) {
  const [values, setValues] = useState({ username: '', password: '', confirm: '', question: '', answer: '' });
  const [touched, setTouched] = useState({});

  const invalid = (k) => touched[k] && !values[k];
  const set = (k, v) => setValues((s)=>({ ...s, [k]: v }));

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
            <Form.Control isInvalid={invalid('username')} value={values.username} onChange={(e)=>set('username', e.target.value)} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
            <Form.Control type="password" isInvalid={invalid('password')} value={values.password} onChange={(e)=>set('password', e.target.value)} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" isInvalid={invalid('confirm') || (touched.confirm && values.confirm !== values.password)} value={values.confirm} onChange={(e)=>set('confirm', e.target.value)} />
          <Form.Control.Feedback type="invalid">Passwords must match</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Secret Question</Form.Label>
          <Form.Control isInvalid={invalid('question')} value={values.question} onChange={(e)=>set('question', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Label>Answer</Form.Label>
          <Form.Control isInvalid={invalid('answer')} value={values.answer} onChange={(e)=>set('answer', e.target.value)} />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button
          onClick={() => {
            const keys = ['username','password','confirm','question','answer'];
            const t = {}; keys.forEach(k => t[k] = true);
            setTouched(t);
            const ok = keys.every(k => values[k]) && values.password === values.confirm;
            if (ok) onNext?.();
          }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}
