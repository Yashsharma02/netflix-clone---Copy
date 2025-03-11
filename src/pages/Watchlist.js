import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!auth.currentUser) return;
      setUser(auth.currentUser);

      const watchlistRef = collection(db, "watchlist");
      const q = query(watchlistRef, where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const moviesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMovies(moviesData);
    };

    fetchWatchlist();
  }, []);

  return (
    <Container>
      <h2>My Watchlist</h2>
      <MovieGrid>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id}>
              <StyledLink to={`/movie/${movie.id}`}> {/* ✅ Link to Movie Details Page */}
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </StyledLink>
            </MovieCard>
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </MovieGrid>
    </Container>
  );
};

export default Watchlist;

// Styled Components
const Container = styled.div`
  padding: 20px;
  color: white;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const MovieCard = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`  /* ✅ Styled Link to Remove Default Styling */
  text-decoration: none;
  color: white;
  display: block;

  img {
    width: 100%;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);  /* ✅ Slight Zoom Effect on Hover */
  }

  p {
    margin-top: 5px;
  }
`;
