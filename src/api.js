import axios from "axios";

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9";
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Fetch Movies by Category (Trending, Popular, etc.)
export const fetchMovies = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// ✅ Fetch Movies Based on Search Query
export const fetchMoviesBySearch = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
