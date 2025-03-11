import React, { useEffect, useState } from "react";
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
          <img key={movie.id} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
        ))}
      </MovieList>
    </RowContainer>
  );
};

export default MovieRow;

const RowContainer = styled.div`
  margin: 20px;
  color: white;
`;

const MovieList = styled.div`
  display: flex;
  overflow-x: scroll;
`;
