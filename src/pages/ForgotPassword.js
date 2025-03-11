import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (error) {
      setMessage("Failed to send reset email. Check the email entered.");
    }
  };

  return (
    <Container>
      <h2>Forgot Password?</h2>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleReset}>Send Reset Link</Button>
      <p>{message}</p>
    </Container>
  );
};

export default ForgotPassword;

const Container = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  margin: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
