import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // ✅ Import Firestore
import { auth } from "../firebase"; // ✅ Import Firebase Authentication

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9"; // Replace with your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";
const db = getFirestore(); // Initialize Firestore

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Get logged-in user
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
        const data = await response.json();
        setMovie(data);

        if (data.videos && data.videos.results.length > 0) {
          const trailer = data.videos.results.find((vid) => vid.type === "Trailer");
          setVideoKey(trailer ? trailer.key : data.videos.results[0].key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // ✅ Function to add movie to Firestore watchlist
  const addToWatchlist = async () => {
    if (!user) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }

    const watchlistRef = doc(db, "users", user.uid, "watchlist", id);
    try {
      await setDoc(watchlistRef, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
      alert("Added to Watchlist! ✅");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <MovieContainer>
      {videoKey && (
        <VideoWrapper>
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
      )}

      <MovieInfo>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        {/* ✅ Add to Watchlist Button */}
        <WatchlistButton onClick={addToWatchlist}>Add to Watchlist</WatchlistButton>
      </MovieInfo>
    </MovieContainer>
  );
};

export default MovieDetails;

// Styled Components
const MovieContainer = styled.div`
  text-align: center;
  color: white;
  background-color: black;
  padding: 20px;
`;

const VideoWrapper = styled.div`
  margin-bottom: 20px;
`;

const MovieInfo = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: left;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const WatchlistButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  &:hover {
    background-color: darkred;
  }
`;
