import React, { useEffect } from 'react';
import { Card, Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';

const PaymentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, fetchPayments } = usePaymentContext();
  const { payments, loading, error } = state;

  const payment = payments.find((p) => p.id === id);

  useEffect(() => {
    if (!payment) {
      fetchPayments();
    }
  }, [payment]);

  if (loading && !payment) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" /> Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!payment) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Payment not found.</Alert>
        <Button onClick={() => navigate('/home')}>Back to Dashboard</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          <p>
            <strong>ID:</strong> {payment.id}
          </p>
          <p>
            <strong>Semester:</strong> {payment.semester}
          </p>
          <p>
            <strong>Course:</strong> {payment.courseName}
          </p>
          <p>
            <strong>Amount:</strong>{' '}
            {Number(payment.amount).toLocaleString()} VND
          </p>
          <p>
            <strong>Date:</strong> {payment.date}
          </p>

          <div className="mt-3 d-flex gap-2">
            <Button
              variant="primary"
              onClick={() => navigate(`/payments/${payment.id}/edit`)}
            >
              Edit
            </Button>
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentDetailsPage;
