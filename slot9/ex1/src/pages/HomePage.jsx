import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { Row, Col, Container } from "react-bootstrap";
import { movies } from "../data/movies";
import MovieCard from "../components/Movie/MovieCard";

export default function HomePage() {
  return (
    <Container className="page">
      <HomeCarousel />

      <div className="mt-4">
        <h4 className="section-title">Featured Movies Collections</h4>
        <p className="section-sub">Một số bộ phim nổi bật.</p>

        <Row xs={1} sm={2} lg={3} className="grid">
          {movies.map(m => (
            <Col key={m.id}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
