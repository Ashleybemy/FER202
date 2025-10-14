import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AppNavBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    navigate(`/movies?query=${encodeURIComponent(q)}`);
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/footer">Footer</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
            <NavDropdown title="Accounts" id="basic-nav-dropdown">
              <NavDropdown.Item>Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item>Build your Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Change Password</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex" onSubmit={doSearch}>
            <Form.Control
              type="search"
              placeholder="Quick search"
              className="me-2"
              aria-label="Search"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
            <Button type="submit" variant="outline-info">Search</Button>
          </Form>

          <Nav className="ms-3">
            <Nav.Link title="Login"><i className="bi bi-box-arrow-in-right"></i></Nav.Link>
            <Nav.Link title="Favourites"><i className="bi bi-heart"></i></Nav.Link>
            <Nav.Link title="Profile"><i className="bi bi-person-circle"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
