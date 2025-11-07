import React from 'react';
import { Table, Button, Badge, Image } from 'react-bootstrap';

const UserTable = ({ users, onViewDetails, onBanAccount }) => {
  const renderStatusBadge = (status) => {
    let variant = 'secondary';
    if (status === 'active') variant = 'success';
    if (status === 'banned' || status === 'locked') variant = 'danger';
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th style={{ width: '230px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center">
              No users found.
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {u.avatar ? (
                  <Image
                    src={u.avatar}
                    alt={u.username}
                    roundedCircle
                    width={40}
                    height={40}
                  />
                ) : (
                  <span>No avatar</span>
                )}
              </td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{renderStatusBadge(u.status)}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => onViewDetails(u)}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant={u.status === 'active' ? 'danger' : 'success'}
                  onClick={() => onBanAccount(u)}
                >
                  {u.status === 'active' ? 'Ban Account' : 'Unban'}
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
