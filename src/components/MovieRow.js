import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import styled from "styled-components";
import { fetchMovies } from "../api";

const MovieRow = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(category);
      setMovies(data);
    };
    getMovies();
  }, [category]);

  return (
    <RowContainer>
      <h2>{title}</h2>
      <MovieList>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <Link to={`/movie/${movie.id}`}> {/* ✅ Click redirects to Movie Details */}
              <MoviePoster src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            </Link>
          </MovieCard>
        ))}
      </MovieList>
    </RowContainer>
  );
};

export default MovieRow;

// Styled Components
const RowContainer = styled.div`
  margin: 20px;
  color: white;
`;

const MovieList = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
`;

const MovieCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const MoviePoster = styled.img`
  width: 150px;
  border-radius: 5px;
`;
