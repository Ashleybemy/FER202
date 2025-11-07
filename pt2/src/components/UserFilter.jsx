import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const UserFilter = ({ filters, roles, statuses, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form>
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Group controlId="keyword">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  name="keyword"
                  placeholder="Search by username or full name"
                  value={filters.keyword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={filters.role}
                  onChange={handleChange}
                >
                  <option value="all">All</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                >
                  <option value="all">All</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="sortField">
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                  name="sortField"
                  value={filters.sortField}
                  onChange={handleChange}
                >
                  <option value="username">Username</option>
                  <option value="fullName">Full Name</option>
                  <option value="role">Role</option>
                  <option value="status">Status</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="sortDirection">
                <Form.Label>Direction</Form.Label>
                <Form.Select
                  name="sortDirection"
                  value={filters.sortDirection}
                  onChange={handleChange}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md="auto">
              <Button
                variant="secondary"
                type="button"
                className="mt-2"
                onClick={onReset}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
