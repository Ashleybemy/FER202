// src/components/LoginForm.jsx
import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

// 1. Trạng thái ban đầu cho form
const initialFormState = {
  identifier: '', // username hoặc email
  password: '',
  errors: {},
  showSuccessModal: false
};

// 2. Reducer cho form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case 'CLEAR_ERROR': {
      const { [action.field]: _, ...rest } = state.errors;
      return { ...state, errors: rest };
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SHOW_SUCCESS_MODAL':
      return { ...state, showSuccessModal: true };
    case 'HIDE_SUCCESS_MODAL':
      return { ...state, showSuccessModal: false };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  // 3. useReducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // 4. Lấy hàm/biến từ AuthContext
  const { login, loading, error, clearError, user } = useAuth();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // 6. Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: 'SET_FIELD', field: name, value });
    clearError();

    if (name === 'identifier') {
      if (!value.trim()) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Username or Email is required.' });
      } else if (isEmail(value) && !emailRe.test(value)) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Email is invalid format.' });
      } else {
        dispatch({ type: 'CLEAR_ERROR', field: name });
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Password is required.' });
      } else {
        dispatch({ type: 'CLEAR_ERROR', field: name });
      }
    }
  };

  // 7. Validate form tổng
  const validateForm = () => {
    const errors = {};
    if (!formState.identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
      errors.identifier = 'Email is invalid format.';
    }
    if (!formState.password.trim()) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  // 8. Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await login(formState.identifier.trim(), formState.password);
      if (result.ok) {
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // 9. Reset form
  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
    clearError();
  };

  // 10. Đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login with AuthContext</h3>
            </Card.Header>
            <Card.Body>
              {/* Lỗi từ AuthContext */}
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username or email"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="primary" type="submit" style={{ flex: 1 }} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </div>

                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Demo accounts:<br />
                    Admin: <strong>admin</strong> / <strong>123456</strong><br />
                    User: <strong>user1</strong> / <strong>123456</strong> (access denied)<br />
                    Locked: <strong>user2</strong> / <strong>123456</strong> (locked account)
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thành công */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful"
        message={`Welcome, ${user?.username}! You have successfully logged in as ${user?.role}.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;
