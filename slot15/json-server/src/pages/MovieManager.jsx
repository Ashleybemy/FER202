import React from 'react';
import MovieProvider from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

export default function MovieManager() {
  return (
    <MovieProvider>
      <div className="container">
        <h3 className="mb-3">Movie Manager (json-server)</h3>
        <MovieForm />
        <MovieTable />
      </div>
    </MovieProvider>
  );
}
