import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <BannerContainer>
      <h1>See what's next</h1>
      <p>WATCH ANYWHERE. CANCEL ANYTIME</p>
      <button>WATCH FREE FOR 30 DAYS</button>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  background: url('/banner.jpg') center/cover no-repeat;
  height: 500px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  
  h1 {
    font-size: 48px;
    font-weight: bold;
  }
  
  p {
    font-size: 20px;
  }
  
  button {
    background: red;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    margin-top: 20px;
  }
`;
