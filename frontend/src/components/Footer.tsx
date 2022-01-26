import styled from "styled-components";

const Copyright = styled.p`
  font-family: "Noto Sans KR, sans-serif";
  margin-left: 10px;
  color: #2C303A;
  text-align: center;
`;

const Footer = () => {
  return (
    <>
      <Copyright>
        <span>Twitproview</span>
        <span>Copyright 2022. twitproview. All Rights Reserved.</span>
      </Copyright>
    </>
  );
}
export default Footer;