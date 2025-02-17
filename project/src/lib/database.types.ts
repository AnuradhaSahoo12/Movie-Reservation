export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      genres: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      halls: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      movie_genres: {
        Row: {
          movie_id: string
          genre_id: string
        }
        Insert: {
          movie_id: string
          genre_id: string
        }
        Update: {
          movie_id?: string
          genre_id?: string
        }
      }
      movies: {
        Row: {
          id: string
          title: string
          description: string | null
          poster_url: string | null
          duration: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          poster_url?: string | null
          duration: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          poster_url?: string | null
          duration?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'user'
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          user_id: string
          showtime_id: string
          seat_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          showtime_id: string
          seat_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          showtime_id?: string
          seat_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      seats: {
        Row: {
          id: string
          hall_id: string
          row_letter: string
          seat_number: number
          created_at: string
        }
        Insert: {
          id?: string
          hall_id: string
          row_letter: string
          seat_number: number
          created_at?: string
        }
        Update: {
          id?: string
          hall_id?: string
          row_letter?: string
          seat_number?: number
          created_at?: string
        }
      }
      showtimes: {
        Row: {
          id: string
          movie_id: string
          hall_id: string
          start_time: string
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          movie_id: string
          hall_id: string
          start_time: string
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          movie_id?: string
          hall_id?: string
          start_time?: string
          price?: number
          created_at?: string
        }
      }
    }
    Functions: {
      get_available_seats: {
        Args: {
          p_showtime_id: string
        }
        Returns: {
          seat_id: string
          row_letter: string
          seat_number: number
        }[]
      }
      is_seat_available: {
        Args: {
          p_showtime_id: string
          p_seat_id: string
        }
        Returns: boolean
      }
    }
  }
}