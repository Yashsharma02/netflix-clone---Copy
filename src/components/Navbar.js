import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavContainer>
      <Logo>NETFLIX</Logo>
      <LoginButton to="/login">Sign In</LoginButton>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: black;
  color: red;
`;

const Logo = styled.h1`
  font-size: 24px;
`;

const LoginButton = styled(Link)`
  background: red;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
`;
