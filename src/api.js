import axios from "axios";

const API_KEY = "cae9c898d1baf4c72539d61c39bde1b9";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (category) => {
  const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
  return response.data.results;
};
