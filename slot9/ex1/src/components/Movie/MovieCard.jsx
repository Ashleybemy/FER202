import { useMemo, useState } from "react";
import { Card, Button, Badge, Modal, Row, Col, Toast, ToastContainer } from "react-bootstrap";

export default function MovieCard({ movie }) {
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);

  const altPoster = useMemo(() => movie.title ? `Poster of ${movie.title}` : "Movie poster", [movie.title]);

  const handleAddFav = () => {
    const raw = localStorage.getItem("favourites");
    const fav = raw ? JSON.parse(raw) : [];
    if (!fav.find(x => x.id === movie.id))
      localStorage.setItem("favourites", JSON.stringify([...fav, { id: movie.id, title: movie.title }]));
    setToast(true);
  };

  return (
    <>
      <Card className="movie-card h-100">
        <Card.Img variant="top" src={movie.poster} alt={altPoster} className="movie-img" />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <Card.Title className="movie-title mb-1">{movie.title}</Card.Title>
            <Badge bg="secondary" pill>{movie.year}</Badge>
          </div>
          <Card.Text className="movie-desc">{movie.description}</Card.Text>

          <Row className="g-2 mt-1">
            <Col xs="auto"><Badge className="badge-soft" pill>{movie.genre}</Badge></Col>
            <Col xs="auto"><Badge className="badge-soft" pill>{movie.country}</Badge></Col>
            <Col xs="auto"><Badge bg="dark" pill>{movie.duration}m</Badge></Col>
          </Row>

          <div className="d-flex gap-2 mt-3">
            <Button variant="outline-primary" size="sm" onClick={handleAddFav}>Add to Favourites</Button>
            <Button variant="primary" size="sm" onClick={() => setShow(true)}>View Details</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton><Modal.Title>{movie.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <img src={movie.poster} alt={altPoster} className="img-fluid mb-3" style={{ borderRadius: 10 }} />
          <p className="mb-2"><strong>Description:</strong> {movie.description}</p>
          <Row className="gy-2">
            <Col xs="auto"><Badge className="badge-soft" pill>{movie.genre}</Badge></Col>
            <Col xs="auto"><Badge className="badge-soft" pill>{movie.country}</Badge></Col>
            <Col xs="auto"><Badge bg="dark" pill>{movie.duration}m</Badge></Col>
          </Row>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setToast(false)} show={toast} delay={1400} autohide>
          <Toast.Header><strong className="me-auto">Favourites</strong><small>Now</small></Toast.Header>
          <Toast.Body>Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
