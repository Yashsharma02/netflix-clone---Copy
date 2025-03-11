import React from "react";
import styled from "styled-components";


const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterRow>
          <FooterColumn>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Investor Relations</FooterLink>
            <FooterLink href="#">Ways to Watch</FooterLink>
            <FooterLink href="#">Corporate Information</FooterLink>
            <FooterLink href="#">Netflix Originals</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Jobs</FooterLink>
            <FooterLink href="#">Terms of Use</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterLink href="#">Account</FooterLink>
            <FooterLink href="#">Redeem Gift Cards</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Speed Test</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterLink href="#">Media Center</FooterLink>
            <FooterLink href="#">Buy Gift Cards</FooterLink>
            <FooterLink href="#">Cookie Preferences</FooterLink>
            <FooterLink href="#">Legal Notices</FooterLink>
          </FooterColumn>
        </FooterRow>
        <FooterText>Questions? Call 1-866-579-7127</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 40px 10%;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  color: gray;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: gray;
`;
