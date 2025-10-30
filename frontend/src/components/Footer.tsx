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
      <p>&copy; {new Date().getFullYear()} AI X Post Simulator. All Rights Reserved.</p>
      <p>AI-Generated Content • Not Real Tweets</p>
    </FooterContainer>
  );
}

export default Footer;
