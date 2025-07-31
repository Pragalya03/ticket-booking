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
  const [currentPage, setCurrentPage] = useState('signup');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePageChange = (page, seats = [], movie = null) => {
    if (movie !== null) setSelectedMovie(movie);
    setSelectedSeats(seats);
    setCurrentPage(page);
  };

  const renderPage = () => {
    console.log('Current Page:', currentPage); // Debug

    switch (currentPage) {
      case 'signup':
        return <Signup goTo={() => setCurrentPage('login')} />;

      case 'login':
        return <Login goTo={() => setCurrentPage('movieListings')} />;

      case 'movieListings':
        console.log('Rendering MovieListings');
        return (
          <MovieListings
            onSelectMovie={(movie) => {
              setSelectedMovie(movie);
              setCurrentPage('seatSelection');
            }}
            goTo={handlePageChange}
          />
        );

      case 'seatSelection':
        return (
          <SeatSelection
            movie={selectedMovie}
            goTo={handlePageChange}
          />
        );

      case 'ticketConfirmation':
        return (
          <TicketConfirmation
            movie={selectedMovie}
            selectedSeats={selectedSeats}
            goTo={handlePageChange}
          />
        );

      case 'userReview':
        return <UserReview goTo={handlePageChange} />;

      case 'userAccount':
        return <UserAccount goTo={handlePageChange} />;

      default:
        return <Signup goTo={() => setCurrentPage('login')} />;
    }
  };

  const showNav = currentPage !== 'signup' && currentPage !== 'login';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Movie Ticket Booking</h1>

        {showNav && (
          <nav>
            <button
              onClick={() => {
                console.log('Movies button clicked');
                setSelectedMovie(null); // Clear selected movie
                setCurrentPage('movieListings');
              }}
            >
              Movies
            </button>
            <button onClick={() => setCurrentPage('userReview')}>Reviews</button>
            <button onClick={() => setCurrentPage('userAccount')}>Account</button>
          </nav>
        )}
      </header>

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
