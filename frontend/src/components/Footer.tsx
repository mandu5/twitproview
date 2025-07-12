import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #1a202c;
  color: #a0aec0;
  padding: 20px;
  text-align: center;
  margin-top: 50px;
  font-size: 14px;
  border-top: 1px solid #2d3748;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Twitproview. All Rights Reserved.</p>
      <p>Data powered by Twitter API</p>
    </FooterContainer>
  );
}

export default Footer;
