import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styled from "styled-components";

const Signup = () => {
  const [name, setName] = useState(""); // ✅ New State for Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name }); // ✅ Save Name in Firebase
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignupContainer>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required /> {/* ✅ Name Input */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #222;
  color: white;
  text-align: center;
  border-radius: 5px;
`;
