import React, { useState } from 'react';
import './UserReview.css';

function UserReview({ goTo }) {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    alert('Review submitted!');
    goTo('movieListings');
  };

  return (
    <div className="user-review">
      <h2>Submit a Review</h2>
      <textarea 
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      />
      <button onClick={handleSubmit}>Submit Review</button>
      <button onClick={() => goTo('movieListings')}>Back to Movies</button>
    </div>
  );
}

export default UserReview;

