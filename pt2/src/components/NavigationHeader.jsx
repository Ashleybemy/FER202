import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fullName = user?.fullName || user?.username || 'Student';

  const goTo = (path) => () => navigate(path);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={goTo('/home')}>
          Tuition Payment System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link onClick={goTo('/home')}>Dashboard</Nav.Link>
            <Nav.Link onClick={goTo('/payments/add')}>Add Payment</Nav.Link>
            <Nav.Link onClick={goTo('/users')}>User Management</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center">
            <Navbar.Text className="me-3">
              Signed in as: <strong>{fullName}</strong>
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;
