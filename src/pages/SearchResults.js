import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; // ✅ Import Link for navigation
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
