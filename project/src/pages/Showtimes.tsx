import React from 'react';
import { useReservationsStore } from '../store/reservations';

export default function Showtimes() {
  const { showtimes, loadShowtimes } = useReservationsStore();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  React.useEffect(() => {
    loadShowtimes(selectedDate);
  }, [loadShowtimes, selectedDate]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Showtimes</h1>
      <div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="grid gap-6">
        {showtimes.map((showtime) => (
          <div key={showtime.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  {new Date(showtime.start_time).toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                  Price: ${showtime.price}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {/* TODO: Implement reservation flow */}}
              >
                Reserve Seats
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}