import React, { useMemo } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';

const FilterBar = () => {
  const { state, dispatch } = usePaymentContext();
  const { payments, filters, sort } = state;

  const { semesters, courses } = useMemo(() => {
    const semSet = new Set();
    const courseSet = new Set();
    payments.forEach((p) => {
      if (p.semester) semSet.add(p.semester);
      if (p.courseName) courseSet.add(p.courseName);
    });
    return {
      semesters: Array.from(semSet),
      courses: Array.from(courseSet),
    };
  }, [payments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FILTER', payload: { [name]: value } });
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('_');
    dispatch({ type: 'SET_SORT', payload: { field, direction } });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm &amp; Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  name="keyword"
                  placeholder="Search by semester or course name"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  name="semester"
                  value={filters.semester}
                  onChange={handleFilterChange}
                >
                  <option value="">All Semesters</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  name="course"
                  value={filters.course}
                  onChange={handleFilterChange}
                >
                  <option value="">All Courses</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={`${sort.field}_${sort.direction}`}
                  onChange={handleSortChange}
                >
                  <option value="courseName_asc">
                    Course name ascending
                  </option>
                  <option value="courseName_desc">
                    Course name descending
                  </option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
