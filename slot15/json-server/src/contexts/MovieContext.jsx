import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MoviesAPI, GenresAPI } from '../api/movies';

const MovieContext = createContext(null);
export const useMovies = () => useContext(MovieContext);

export default function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  // filter/sort/pagination UI state
  const [q, setQ]               = useState('');
  const [genreId, setGenreId]   = useState('');
  const [sort, setSort]         = useState('year');
  const [order, setOrder]       = useState('desc');
  const [page, setPage]         = useState(1);
  const [limit, setLimit]       = useState(5);

  // form state
  const emptyForm = { id: null, title: '', year: '', duration: '', genreId: '' };
  const [form, setForm] = useState(emptyForm);
  const isEditing = !!form.id;

  async function fetchGenres() {
    const data = await GenresAPI.list();
    setGenres(data);
  }

  async function fetchMovies() {
    try {
      setLoading(true);
      setError('');
      const { data, total } = await MoviesAPI.list({
        q, genreId: genreId || undefined, _sort: sort, _order: order,
        _page: page, _limit: limit
      });
      const arr = data.slice();
      arr.total = total;              // gán tổng vào mảng (thuận tiện dùng ở bảng)
      setMovies(arr);
    } catch (e) {
      setError(e?.message || 'Load movies failed');
    } finally {
      setLoading(false);
    }
  }

  async function saveMovie(e) {
    e?.preventDefault?.();
    const payload = {
      title: String(form.title || '').trim(),
      year: Number(form.year),
      duration: Number(form.duration),
      genreId: Number(form.genreId)
    };
    if (!payload.title || !payload.year || !payload.duration || !payload.genreId) {
      alert('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      if (isEditing) await MoviesAPI.update(form.id, payload);
      else           await MoviesAPI.create(payload);
      setForm(emptyForm);
      await fetchMovies();
    } catch (e) {
      alert(e?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  }

  function startEdit(m) {
    setForm({ id: m.id, title: m.title, year: m.year, duration: m.duration, genreId: m.genreId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() { setForm(emptyForm); }

  async function removeMovie(id) {
    if (!window.confirm('Delete this movie?')) return;
    try {
      setLoading(true);
      await MoviesAPI.remove(id);
      await fetchMovies();
    } catch (e) {
      alert(e?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchGenres(); }, []);
  useEffect(() => { fetchMovies(); }, [q, genreId, sort, order, page, limit]);

  const value = useMemo(() => ({
    movies, genres, loading, error,
    q, setQ, genreId, setGenreId, sort, setSort, order, setOrder, page, setPage, limit, setLimit,
    form, setForm, isEditing, saveMovie, startEdit, cancelEdit,
    removeMovie
  }), [movies, genres, loading, error, q, genreId, sort, order, page, limit, form, isEditing]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
