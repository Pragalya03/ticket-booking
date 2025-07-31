import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieListings.css';

function MovieListings({ onSelectMovie, goTo }) {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', image: '', showtimes: [] });
  const [editingMovie, setEditingMovie] = useState(null);

  // Fetch movies on mount
  useEffect(() => {
    axios.get('http://localhost:8081/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("Error fetching the movie data", error);
      });
  }, []);

  // Add movie
  const addMovie = () => {
    axios.post('http://localhost:8081/movies', newMovie)
      .then(response => {
        setMovies([...movies, response.data]);
        setNewMovie({ title: '', image: '', showtimes: [] });
      })
      .catch(error => {
        console.error("Error adding the movie", error);
      });
  };

  // Update movie
  const updateMovie = () => {
    if (!editingMovie || !editingMovie.id) return;

    axios.put(`http://localhost:8081/movies/${editingMovie.id}`, editingMovie)
      .then(response => {
        const updatedMovies = movies.map(movie =>
          movie.id === editingMovie.id ? response.data : movie
        );
        setMovies(updatedMovies);
        setEditingMovie(null);
      })
      .catch(error => {
        console.error("Error updating the movie", error);
      });
  };

  // Delete movie
  const deleteMovie = (movieId) => {
    axios.delete(`http://localhost:8081/movies/${movieId}`)
      .then(() => {
        setMovies(movies.filter(movie => movie.id !== movieId));
      })
      .catch(error => {
        console.error("Error deleting the movie", error);
      });
  };

  // Select movie for seat selection
  const handleSelectMovie = (movie) => {
    onSelectMovie(movie);
    goTo('seatSelection');
  };

  return (
    <div className="movie-listings">
      <h2>Available Movies</h2>

      {/* Add Movie */}
      <div className="add-movie-form">
        <h3>Add a New Movie</h3>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newMovie.image}
          onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Showtimes (comma separated)"
          value={newMovie.showtimes.join(',')}
          onChange={(e) =>
            setNewMovie({ ...newMovie, showtimes: e.target.value.split(',').map(s => s.trim()) })
          }
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* Edit Movie */}
      {editingMovie && (
        <div className="edit-movie-form">
          <h3>Edit Movie</h3>
          <input
            type="text"
            placeholder="Title"
            value={editingMovie.title || ""}
            onChange={(e) =>
              setEditingMovie({ ...editingMovie, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editingMovie.image || ""}
            onChange={(e) =>
              setEditingMovie({ ...editingMovie, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Showtimes (comma separated)"
            value={
              Array.isArray(editingMovie.showtimes)
                ? editingMovie.showtimes.join(',')
                : ''
            }
            onChange={(e) =>
              setEditingMovie({
                ...editingMovie,
                showtimes: e.target.value.split(',').map(s => s.trim()),
              })
            }
          />
          <button onClick={updateMovie}>Update Movie</button>
          <button onClick={() => setEditingMovie(null)}>Cancel</button>
        </div>
      )}

      {/* Movie Cards */}
      <div className="movie-cards">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h3 className="movie-title">{movie.title}</h3>
            <div className="showtimes">
              {movie.showtimes.map((time, index) => (
                <span key={index} className="showtime">{time}</span>
              ))}
            </div>
            <button onClick={() => handleSelectMovie(movie)}>Select</button>
            <button onClick={() => {
              console.log("Edit clicked:", movie);
              setEditingMovie({ ...movie });
            }}>
              Edit
            </button>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListings;
