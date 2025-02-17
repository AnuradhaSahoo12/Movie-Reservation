import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Showtime = Database['public']['Tables']['showtimes']['Row'];
type Reservation = Database['public']['Tables']['reservations']['Row'];
type Seat = Database['public']['Tables']['seats']['Row'];

interface ReservationsState {
  showtimes: Showtime[];
  reservations: Reservation[];
  availableSeats: Seat[];
  loadShowtimes: (date: Date) => Promise<void>;
  loadReservations: () => Promise<void>;
  loadAvailableSeats: (showtimeId: string) => Promise<void>;
  createReservation: (showtimeId: string, seatId: string) => Promise<void>;
  cancelReservation: (reservationId: string) => Promise<void>;
}

export const useReservationsStore = create<ReservationsState>((set, get) => ({
  showtimes: [],
  reservations: [],
  availableSeats: [],

  loadShowtimes: async (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from('showtimes')
      .select('*')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString());
    
    if (error) throw error;
    set({ showtimes: data });
  },

  loadReservations: async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*');
    if (error) throw error;
    set({ reservations: data });
  },

  loadAvailableSeats: async (showtimeId) => {
    const { data, error } = await supabase
      .rpc('get_available_seats', { p_showtime_id: showtimeId });
    if (error) throw error;
    set({ availableSeats: data });
  },

  createReservation: async (showtimeId, seatId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('reservations')
      .insert({
        user_id: user.id,
        showtime_id: showtimeId,
        seat_id: seatId,
      });
    if (error) throw error;
    
    await get().loadReservations();
  },

  cancelReservation: async (reservationId) => {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId);
    if (error) throw error;
    
    await get().loadReservations();
  },
}));