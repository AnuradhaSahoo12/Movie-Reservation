import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { Film, Calendar, Ticket } from 'lucide-react';

// Lazy load components
const Movies = React.lazy(() => import('./pages/Movies'));
const Showtimes = React.lazy(() => import('./pages/Showtimes'));
const Reservations = React.lazy(() => import('./pages/Reservations'));
const Auth = React.lazy(() => import('./pages/Auth'));

function App() {
  const { user, loadProfile } = useAuthStore();

  React.useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (!user) {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </React.Suspense>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <a href="/movies" className="flex items-center text-gray-700 hover:text-gray-900">
                  <Film className="w-5 h-5 mr-2" />
                  <span>Movies</span>
                </a>
                <a href="/showtimes" className="flex items-center text-gray-700 hover:text-gray-900">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Showtimes</span>
                </a>
                <a href="/reservations" className="flex items-center text-gray-700 hover:text-gray-900">
                  <Ticket className="w-5 h-5 mr-2" />
                  <span>My Reservations</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/movies" element={<Movies />} />
              <Route path="/showtimes" element={<Showtimes />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="*" element={<Movies />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;