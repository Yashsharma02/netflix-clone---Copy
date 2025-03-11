import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { auth } from "../firebase";
import styled from "styled-components";

const db = getFirestore();

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchWatchlist(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWatchlist = async (userId) => {
    const watchlistRef = collection(db, "users", userId, "watchlist");
    const snapshot = await getDocs(watchlistRef);
    setWatchlist(snapshot.docs.map((doc) => doc.data()));
  };

  if (!user) return <h2>Please log in to see your Watchlist.</h2>;

  return (
    <WatchlistContainer>
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <MovieGrid>
          {watchlist.map((movie) => (
            <MovieCard key={movie.id}>
              <StyledLink to={`/movie/${movie.id}`}> {/* ✅ Clickable Movie Card */}
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </StyledLink>
            </MovieCard>
          ))}
        </MovieGrid>
      )}
    </WatchlistContainer>
  );
};

export default Watchlist;

// Styled Components
const WatchlistContainer = styled.div`
  text-align: center;
  color: white;
  background-color: black;
  padding: 20px;
`;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const MovieCard = styled.div`
  text-align: center;
  width: 150px;
`;

const StyledLink = styled(Link)`  /* ✅ Styled Link */
  text-decoration: none;
  color: white;
  display: block;

  img {
    width: 100%;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);  /* ✅ Zoom effect on hover */
  }

  p {
    margin-top: 5px;
    font-weight: bold;
  }
`;
