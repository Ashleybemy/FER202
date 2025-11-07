import React, { useEffect, useState } from 'react';
import { Card, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';

const emptyForm = {
  semester: '',
  courseName: '',
  amount: '',
  date: '',
};

const AddPaymentPage = () => {
  const { id } = useParams(); // nếu /payments/:id/edit thì sẽ có id
  const isEditMode = Boolean(id);

  const { state, fetchPayments, addPayment, updatePayment } =
    usePaymentContext();
  const { payments } = state;

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // Nếu ở edit mode, lấy payment từ state
  useEffect(() => {
    if (isEditMode) {
      const found = payments.find((p) => p.id === id);
      if (found) {
        setForm({
          semester: found.semester || '',
          courseName: found.courseName || '',
          amount: String(found.amount ?? ''),
          date: found.date || '',
        });
      } else {
        // nếu state chưa có data -> fetch
        fetchPayments();
      }
    } else {
      setForm(emptyForm);
    }
  }, [id, isEditMode, payments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!form.semester || !form.courseName || !form.amount || !form.date) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        setSubmitting(false);
        return;
      }

      if (isEditMode) {
        await updatePayment(id, {
          semester: form.semester,
          courseName: form.courseName,
          amount: Number(form.amount),
          date: form.date,
        });
        alert('Cập nhật payment thành công!');
      } else {
        await addPayment({
          semester: form.semester,
          courseName: form.courseName,
          amount: Number(form.amount),
          date: form.date,
        });
        alert('Thêm payment mới thành công!');
      }

      navigate('/home');
    } catch (err) {
      alert('Có lỗi xảy ra: ' + (err.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header as="h5">
          {isEditMode ? 'Edit Payment' : 'Add New Payment'}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="text"
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    placeholder="e.g. Fall 2025"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseName"
                    value={form.courseName}
                    onChange={handleChange}
                    placeholder="e.g. Web Development"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Amount (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? isEditMode
                    ? 'Saving...'
                    : 'Creating...'
                  : isEditMode
                  ? 'Save changes'
                  : 'Create'}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPaymentPage;
