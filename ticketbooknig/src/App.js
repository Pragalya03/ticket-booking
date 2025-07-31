import React, { useState } from 'react';
import MovieListings from './components/MovieListings';
import SeatSelection from './components/SeatSelection';
import TicketConfirmation from './components/TicketConfirmation';
import UserReview from './components/UserReview';
import UserAccount from './components/UserAccount';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('signup'); // Start with 'signup' page
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePageChange = (page, seats = []) => {
    setSelectedSeats(seats);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup goTo={() => setCurrentPage('login')} />; // Go to Login after signup
      case 'login':
        return <Login goTo={() => setCurrentPage('movieListings')} />; // Go to Movie Listings after login
      case 'movieListings':
        return <MovieListings onSelectMovie={setSelectedMovie} goTo={handlePageChange} />;
      case 'seatSelection':
        return <SeatSelection movie={selectedMovie} goTo={handlePageChange} />;
      case 'ticketConfirmation':
        return <TicketConfirmation movie={selectedMovie} selectedSeats={selectedSeats} goTo={handlePageChange} />;
      case 'userReview':
        return <UserReview goTo={handlePageChange} />;
      case 'userAccount':
        return <UserAccount goTo={handlePageChange} />;
      default:
        return <Signup goTo={() => setCurrentPage('login')} />; // Default to signup if no valid page
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Movie Ticket Booking</h1>
        <nav>
          <button onClick={() => setCurrentPage('movieListings')}>Movies</button>
          <button onClick={() => setCurrentPage('userReview')}>Reviews</button>
          <button onClick={() => setCurrentPage('userAccount')}>Account</button>
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;




