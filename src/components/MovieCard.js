import React from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const MovieCard = ({ movie }) => {
  const user = auth.currentUser;

  const addToWatchlist = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    try {
      await addDoc(collection(db, "users", user.uid, "watchlist"), {
        title: movie.title,
        poster: movie.poster_path
      });
      alert("Added to Watchlist!");
    } catch (error) {
      console.error("Error adding to watchlist: ", error);
    }
  };

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button onClick={addToWatchlist}>Add to Watchlist</button>
    </div>
  );
};

export default MovieCard;
