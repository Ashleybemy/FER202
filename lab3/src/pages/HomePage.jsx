import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { useMemo, useState } from "react";
import { movies } from "../data/movies/movies";

function applyFilter(list, { query, yearRange, sortBy }) {
  let out = [...list];
  if (query) {
    const q = query.toLowerCase();
    out = out.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
  }
  if (yearRange === 'le2000') out = out.filter(m => m.year <= 2000);
  if (yearRange === '2001-2015') out = out.filter(m => m.year >= 2001 && m.year <= 2015);
  if (yearRange === 'gt2015') out = out.filter(m => m.year > 2015);
  const cmp = {
    'title-asc': (a,b)=>a.title.localeCompare(b.title),
    'title-desc': (a,b)=>b.title.localeCompare(a.title),
    'year-asc': (a,b)=>a.year - b.year,
    'year-desc': (a,b)=>b.year - a.year,
    'duration-asc': (a,b)=>a.duration - b.duration,
    'duration-desc': (a,b)=>b.duration - a.duration,
  }[sortBy || 'title-asc'];
  out.sort(cmp);
  return out;
}

export default function HomePage() {
  const [filters, setFilters] = useState({ query: '', yearRange: 'all', sortBy: 'title-asc' });
  const filtered = useMemo(()=> applyFilter(movies, filters).slice(0,6), [filters]);

  return (
    <div>
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">Some highlighted movies curated for you.</p>
      </div>

      <Filter onChange={setFilters} />

      <Row xs={1} md={3} className="g-4">
        {filtered.map(m => (
          <Col key={m.id}><MovieCard movie={m} /></Col>
        ))}
      </Row>
    </div>
  );
}
