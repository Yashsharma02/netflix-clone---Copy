import React from "react";

import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";

const Home = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      
      <Banner />
      <MovieRow title="Popular Movies" category="popular" />
      <MovieRow title="Top Rated" category="top_rated" />
    </div>
  );
};

export default Home;
