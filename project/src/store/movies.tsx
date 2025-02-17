import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Movie = Database['public']['Tables']['movies']['Row'];
type Genre = Database['public']['Tables']['genres']['Row'];

interface MoviesState {
  movies: Movie[];
  genres: Genre[];
  loadMovies: () => Promise<void>;
  loadGenres: () => Promise<void>;
  addMovie: (movie: Omit<Movie, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateMovie: (id: string, movie: Partial<Movie>) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: [],
  genres: [],

  loadMovies: async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*');
    if (error) throw error;
    set({ movies: data });
  },

  loadGenres: async () => {
    const { data, error } = await supabase
      .from('genres')
      .select('*');
    if (error) throw error;
    set({ genres: data });
  },

  addMovie: async (movie) => {
    const { error } = await supabase
      .from('movies')
      .insert(movie);
    if (error) throw error;
    await get().loadMovies();
  },

  updateMovie: async (id, movie) => {
    const { error } = await supabase
      .from('movies')
      .update(movie)
      .eq('id', id);
    if (error) throw error;
    await get().loadMovies();
  },

  deleteMovie: async (id) => {
    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await get().loadMovies();
  },
}));