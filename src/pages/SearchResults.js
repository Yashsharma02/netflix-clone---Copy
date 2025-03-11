import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchMoviesBySearch } from "../api"; // Function to Fetch Search Results

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetchMoviesBySearch(query).then(setMovies);
    }
  }, [query]);

  return (
    <Container>
      <h2>Search Results for: "{query}"</h2>
      <MovieGrid>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </MovieCard>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </MovieGrid>
    </Container>
  );
};

export default SearchResults;

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
  img {
    width: 100%;
    border-radius: 5px;
  }
`;
