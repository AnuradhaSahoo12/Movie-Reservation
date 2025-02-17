import React from 'react';
import { useMoviesStore } from '../store/movies';

export default function Movies() {
  const { movies, loadMovies } = useMoviesStore();

  React.useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {movie.poster_url && (
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-600 line-clamp-2">{movie.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Duration: {movie.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}