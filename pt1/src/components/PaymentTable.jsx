import React, { useEffect, useMemo } from 'react';
import { Card, Table, Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const PaymentTable = () => {
  const { state, fetchPayments, deletePayment } = usePaymentContext();
  const { payments, totalAmount, loading, error, filters, sort } = state;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  // áp dụng search / filter / sort
  const processedPayments = useMemo(() => {
    let list = [...payments];

    const keyword = filters.keyword.trim().toLowerCase();
    if (keyword) {
      list = list.filter((p) => {
        const sem = String(p.semester || '').toLowerCase();
        const course = String(p.courseName || '').toLowerCase();
        return sem.includes(keyword) || course.includes(keyword);
      });
    }

    if (filters.semester) {
      list = list.filter((p) => p.semester === filters.semester);
    }

    if (filters.course) {
      list = list.filter((p) => p.courseName === filters.course);
    }

    if (sort.field) {
      list.sort((a, b) => {
        const dir = sort.direction === 'asc' ? 1 : -1;
        const va = a[sort.field];
        const vb = b[sort.field];

        if (va == null && vb == null) return 0;
        if (va == null) return -1 * dir;
        if (vb == null) return 1 * dir;

        if (typeof va === 'number' && typeof vb === 'number') {
          return (va - vb) * dir;
        }
        return String(va).localeCompare(String(vb)) * dir;
      });
    }

    return list;
  }, [payments, filters, sort]);

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có chắc chắn muốn xóa khoản thanh toán này?');
    if (!ok) return;
    try {
      await deletePayment(id);
    } catch (err) {
      alert('Xóa thất bại: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Payment List</Card.Header>
      <Card.Body>
        {loading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner size="sm" animation="border" /> Loading payments...
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
        )}

        {!loading && processedPayments.length === 0 && (
          <p className="mt-2 mb-0">No payments found.</p>
        )}

        {processedPayments.length > 0 && (
          <Table striped bordered hover responsive size="sm" className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Semester</th>
                <th>Course</th>
                <th>Amount (VND)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedPayments.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{p.semester}</td>
                  <td>{p.courseName}</td>
                  <td>{Number(p.amount).toLocaleString()}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="info"
                        onClick={() => navigate(`/payments/${p.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => navigate(`/payments/${p.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={3} className="text-end fw-bold">
                  Total
                </td>
                <td className="fw-bold">
                  {Number(totalAmount).toLocaleString()} VND
                </td>
                <td />
              </tr>
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default PaymentTable;
