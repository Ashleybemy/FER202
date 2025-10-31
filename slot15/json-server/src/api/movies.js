import http from './http';

export const MoviesAPI = {
  async list(params = {}) {
    const { q, genreId, _sort = 'year', _order = 'desc', _page, _limit } = params;
    const qs = new URLSearchParams();
    if (q) qs.append('title_like', q);
    if (genreId) qs.append('genreId', genreId);
    if (_sort) qs.append('_sort', _sort);
    if (_order) qs.append('_order', _order);
    if (_page) qs.append('_page', _page);
    if (_limit) qs.append('_limit', _limit);
    qs.append('_expand', 'genre');

    const res = await http.get(`/movies?${qs.toString()}`);
    const total = Number(res.headers['x-total-count'] || 0);
    return { data: res.data, total };
  },

  get: (id) => http.get(`/movies/${id}?_expand=genre`).then(r => r.data),
  create: (payload) => http.post('/movies', payload).then(r => r.data),
  update: (id, payload) => http.put(`/movies/${id}`, payload).then(r => r.data),
  remove: (id) => http.delete(`/movies/${id}`)
};

export const GenresAPI = {
  list: () => http.get('/genres').then(r => r.data)
};
