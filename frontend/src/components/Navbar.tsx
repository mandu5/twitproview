import { Link } from "react-router-dom";
import styled from "styled-components";
import { GiBirdTwitter } from "react-icons/gi";

const Brand = styled.h1`
  position: relative;
  float: left;
  font-size: inherit;
  line-height: 50px;
  z-index: 2;
  .link {
    color: #f1efe9;
  }
`;
const Switch = styled.p`
  position: relative;
  float: right;
  line-height: 50px;
  z-index: 2;
  .link {
    color: #f1efe9;
  }
`;

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Brand>
          <Link to="/" className="link">
            <GiBirdTwitter className="icon" />/ Twitproview
          </Link>
        </Brand>
        <Switch>
          <Link to="/trends" className="link">
            <span>Twitter Trends</span>
          </Link>
        </Switch>
      </div>
    </>
  );
};
export default Navbar;
