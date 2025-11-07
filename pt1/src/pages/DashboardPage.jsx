import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationHeader />

      <Container className="mt-4">
        {/* Nút Add Payment ở góc phải trên */}
        <div className="d-flex justify-content-end mb-3">
          <Button onClick={() => navigate('/payments/new')}>
            Add Payment
          </Button>
        </div>

        <FilterBar />

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Dashboard Overview</Card.Header>
          <Card.Body>{/* Nội dung tổng quan khác nếu cần */}</Card.Body>
        </Card>

        <PaymentTable />
      </Container>
    </>
  );
};

export default DashboardPage;
