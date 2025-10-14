import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Filter({ onChange }) {
  const [query, setQuery] = useState('');
  const [yearRange, setYearRange] = useState('all');
  const [sortBy, setSortBy] = useState('title-asc');

  useEffect(() => { onChange?.({ query, yearRange, sortBy }); }, [query, yearRange, sortBy, onChange]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="gy-2">
          <Col md={4}>
            <Form.Label>Search</Form.Label>
            <Form.Control
              placeholder="Search title or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Label>Filter by Year</Form.Label>
            <Form.Select value={yearRange} onChange={(e)=>setYearRange(e.target.value)}>
              <option value="all">All</option>
              <option value="le2000">&le; 2000</option>
              <option value="2001-2015">2001 - 2015</option>
              <option value="gt2015">&gt; 2015</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Sorting</Form.Label>
            <Form.Select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="title-asc">Title A → Z</option>
              <option value="title-desc">Title Z → A</option>
              <option value="year-asc">Year ↑</option>
              <option value="year-desc">Year ↓</option>
              <option value="duration-asc">Duration ↑</option>
              <option value="duration-desc">Duration ↓</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
