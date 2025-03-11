import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search State
  const navigate = useNavigate();

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`); // ✅ Redirect to Search Page
    }
  };

  return (
    <NavContainer>
      <Logo to="/">NETFLIX</Logo>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton type="submit">🔍</SearchButton>
      </SearchForm>
      <NavLinks>
        {user ? (
          <>
            <UserText>Hi, {user?.displayName || "User"}</UserText>
            <WatchlistLink to="/watchlist">My Watchlist</WatchlistLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton to="/login">Sign In</LoginButton>
            <SignupButton to="/signup">Sign Up</SignupButton>
          </>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: black;
  color: red;
`;

const Logo = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: red;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: #222;
  padding: 5px;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  padding: 5px;
  outline: none;
`;

const SearchButton = styled.button`
  background: red;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

const UserText = styled.span`
  color: white;
  font-size: 18px;
`;

const WatchlistLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
`;

const LoginButton = styled(Link)`
  background: red;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
`;

const SignupButton = styled(Link)`
  background: white;
  color: red;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  border: 2px solid red;
`;

const LogoutButton = styled.button`
  background: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
