import React from 'react';
import { useReservationsStore } from '../store/reservations';

export default function Reservations() {
  const { reservations, loadReservations, cancelReservation } = useReservationsStore();

  React.useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Reservations</h1>
      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  Reservation #{reservation.id.slice(0, 8)}
                </p>
                <p className="text-gray-600">
                  Status: {reservation.status}
                </p>
              </div>
              {reservation.status === 'active' && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => cancelReservation(reservation.id)}
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}