import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Image,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import * as api from '../services/api';

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getUserById(id);
        setUser(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleBack = () => navigate('/users');

  const renderStatusBadge = (status) => {
    let variant = 'secondary';
    if (status === 'active') variant = 'success';
    if (status === 'banned' || status === 'locked') variant = 'danger';
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Button variant="secondary" className="mb-3" onClick={handleBack}>
          &larr; Back to User List
        </Button>

        {error && (
          <Alert
            variant="danger"
            onClose={() => setError('')}
            dismissible
            className="mb-3"
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        ) : user ? (
          <Card>
            <Card.Header as="h5">User Details</Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    roundedCircle
                    width={80}
                    height={80}
                    className="me-3"
                  />
                )}
                <div>
                  <Card.Title>{user.fullName}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    @{user.username}
                  </Card.Subtitle>
                </div>
              </div>

              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Status:</strong> {renderStatusBadge(user.status)}</p>
            </Card.Body>
          </Card>
        ) : (
          !loading && <p>User not found.</p>
        )}
      </Container>
    </>
  );
};

export default UserDetailsPage;
