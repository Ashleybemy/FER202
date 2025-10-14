import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const [show, setShow] = useState(false);

  const addToFavourites = () => {
    try {
      const key = 'favourites';
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      if (!list.find(x => x.id === movie.id)) list.push({ id: movie.id, title: movie.title });
      localStorage.setItem(key, JSON.stringify(list));
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.poster} alt={movie.title} className="movie-poster" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="text-secondary" style={{ fontSize: '0.95rem' }}>
          {movie.description.length > 110 ? movie.description.slice(0,110) + '…' : movie.description}
        </Card.Text>
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">{movie.year}</Badge>
          <Badge bg="info" className="text-dark me-2">{movie.genre}</Badge>
          <Badge bg="dark">{movie.country}</Badge>
        </div>
        <div className="mt-auto d-flex justify-content-between">
          <Button variant="primary" onClick={() => window.alert('Show details modal here (sample).')}>
            Details
          </Button>
          <Button variant="outline-warning" onClick={addToFavourites}>
            Add to Favourites
          </Button>
        </div>
      </Card.Body>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShow(false)} show={show} delay={1600} autohide>
          <Toast.Header>
            <strong className="me-auto">Favourites</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body className="text-white">Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
}
