import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiBirdTwitter } from "react-icons/gi";

const Brand = styled.h1`
  position: relative;
  float: left;
  font-size: inherit;
  line-height: 50px;
  z-index: 2;
  margin-left: 140px;
  .link {
    color: #f1efe9;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 10px;
    font-size: 24px;
  }
  @media (max-width: 1189px) {
    margin-left: 0;
  }
`;
const Switch = styled.p`
  position: relative;
  float: right;
  line-height: 50px;
  z-index: 2;
  margin-right: 140px;
  .link {
    color: #f1efe9;
    text-decoration: none;
  }
  @media (max-width: 1189px) {
    margin-right: 0;
  }
`;
const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #1da1f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

function Navbar() {
  return (
    <NavContainer>
      <Brand>
        <Link to="/" className="link">
          <GiBirdTwitter className="icon" /> Twitproview
        </Link>
      </Brand>
      <Switch>
        <Link to="/trends" className="link">
          <span>Trends</span>
        </Link>
      </Switch>
    </NavContainer>
  );
}

export default Navbar;
