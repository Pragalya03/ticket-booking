import React from 'react';
import './TicketConfirmation.css';

function TicketConfirmation({ bookingDetails, onGoBack }) {
  const { movieTitle, showtime, seatNumber, userName, bookingId } = bookingDetails;

  return (
    <div className="ticket-confirmation">
      <h1 className="confirmation-title">Ticket Confirmation</h1>
      <div className="confirmation-details">
        <div className="movie-info">
          <h2 className="movie-title">{movieTitle}</h2>
          <p><strong>Showtime:</strong> {showtime}</p>
          <p><strong>Seat Number:</strong> {seatNumber}</p>
        </div>
        <div className="user-info">
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Booking ID:</strong> {bookingId}</p>
        </div>
      </div>
      
    </div>
  );
}

// Example booking details for demonstration purposes
const exampleBooking = {
  movieTitle: 'Inception',
  showtime: '7:00 PM, September 1, 2024',
  seatNumber: 'A12',
  userName: 'John Doe',
  bookingId: 'ABC123456'
};

// Example callback function for the Go Back button
const handleGoBack = () => {
  // Logic to go back to the movie listings page
  console.log('Going back to movie listings...');
};

export default function TicketConfirmationWrapper() {
  return <TicketConfirmation bookingDetails={exampleBooking} onGoBack={handleGoBack} />;
}



