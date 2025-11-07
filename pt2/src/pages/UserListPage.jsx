import React, { useEffect, useMemo, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import * as api from '../services/api';

const defaultFilters = {
  keyword: '',
  role: 'all',
  status: 'all',
  sortField: 'username',
  sortDirection: 'asc',
};

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // load danh sách users từ JSON-server
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleViewDetails = (user) => {
    // ĐI TỚI TRANG /users/:id
    navigate(`/users/${user.id}`);
  };

  const handleBanAccount = async (user) => {
    try {
      const newStatus = user.status === 'active' ? 'banned' : 'active';
      const updated = { ...user, status: newStatus };

      await api.updateUser(user.id, updated);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updated : u)),
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update user status.');
    }
  };

  const roles = useMemo(
    () => Array.from(new Set(users.map((u) => u.role))).filter(Boolean),
    [users],
  );

  const statuses = useMemo(
    () => Array.from(new Set(users.map((u) => u.status))).filter(Boolean),
    [users],
  );

  const filteredUsers = useMemo(() => {
    let data = [...users];

    const kw = filters.keyword.trim().toLowerCase();
    if (kw) {
      data = data.filter(
        (u) =>
          u.username.toLowerCase().includes(kw) ||
          (u.fullName || '').toLowerCase().includes(kw),
      );
    }

    if (filters.role !== 'all') {
      data = data.filter((u) => u.role === filters.role);
    }

    if (filters.status !== 'all') {
      data = data.filter((u) => u.status === filters.status);
    }

    data.sort((a, b) => {
      const field = filters.sortField;
      const dir = filters.sortDirection === 'asc' ? 1 : -1;

      let va = a[field] ?? '';
      let vb = b[field] ?? '';

      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();

      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });

    return data;
  }, [users, filters]);

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Card className="mb-3">
          <Card.Header as="h5">User Management</Card.Header>
          <Card.Body>
            <p className="mb-0">
              View, search, filter and ban user accounts.
            </p>
          </Card.Body>
        </Card>

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

        <UserFilter
          filters={filters}
          roles={roles}
          statuses={statuses}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <UserTable
            users={filteredUsers}
            onViewDetails={handleViewDetails}
            onBanAccount={handleBanAccount}
          />
        )}
      </Container>
    </>
  );
};

export default UserListPage;
