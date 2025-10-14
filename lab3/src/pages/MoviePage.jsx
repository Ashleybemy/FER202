import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { movies } from '../data/movies/movies';
import MovieCard from '../components/Movie/MovieCard';
import Filter from '../components/Filter/Filter';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

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

export default function MoviePage() {
  const q = useQuery();
  const [filters, setFilters] = useState({ query: '', yearRange: 'all', sortBy: 'title-asc' });

  useEffect(()=>{
    const initialQ = q.get('query') || '';
    if (initialQ) setFilters(f => ({...f, query: initialQ}));
    // eslint-disable-next-line
  }, []);

  const filtered = useMemo(()=> applyFilter(movies, filters), [filters]);

  return (
    <div>
      <h2 className='mb-3'>My movies</h2>
      <Filter onChange={setFilters} />
      <Row xs={1} md={3} className="g-4">
        {filtered.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
