import { Link } from "react-router-dom";
import styled from "styled-components";

const Brand = styled.h1`
  position: relative;
  float: left;
  font-size: inherit;
  line-height: 50px;
  z-index: 2;
`;
const Switch = styled.p`
  position: relative;
  float: right;
  line-height: 50px;
  z-index: 2;
`;

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Brand>
          <Link to="/">
            <span className="Icon"></span>
          </Link>
        </Brand>
        <Switch>
          <Link to="/trends">
            <span className="LinkLongCopy">Twitter Trends</span>
          </Link>
        </Switch>
      </div>
    </>
  );
};
export default Navbar;