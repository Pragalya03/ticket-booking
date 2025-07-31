import React, { useState } from 'react';
import './SeatSelection.css';

function SeatSelection({ movie, goTo }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) => 
      prevSeats.includes(seat) ? prevSeats.filter(s => s !== seat) : [...prevSeats, seat]
    );
  };

  const handleConfirm = () => {
    goTo('ticketConfirmation', selectedSeats);
  };

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 6;

  return (
    <div className="seat-selection">
      <h2>Please select your seat for {movie.title}</h2>
      <div className="seat-map">
        {rows.map(row => (
          <div key={row} className="seat-row">
            {Array.from({ length: seatsPerRow }).map((_, index) => {
              const seat = `${row}${index + 1}`;
              return (
                <div 
                  key={seat}
                  className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`} 
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={handleConfirm}>Confirm Seats</button>
      </div>
    </div>
  );
}

export default SeatSelection;
