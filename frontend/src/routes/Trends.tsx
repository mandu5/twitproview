import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";

const Location = styled.div`
  background-color: #f5f8fa;
  color: #000;
  padding: 16px;
  border-radius: 999px;
  cursor: pointer;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #e5e8e8;
  }
`;
const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Select = styled.select`
  margin: 16px;
  padding: 8px;
  font-size: 16px;
  border-radius: 999px;
  border-color: #aab8c2;
  border-width: 2px;
`;
const TweetVolume = styled.span`
  font-size: 12px;
  background-color: var(--primary-color);
  color: #f5f8fa;
  border-radius: 999px;
  padding: 2px 4px;
  margin-left: 4px;
  font-weight: bold;
`;
const Content = styled.div`
  height: 100%;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
`;
const Brand = styled.h1`
  position: relative;
  float: left;
  font-size: inherit;
  line-height: 50px;
  z-index: 2;
  margin-left: 140px;
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
  @media (max-width: 1189px) {
    margin-right: 0;
  }
`;
const List = styled.div`
  width: 100%;
  li {
    margin: 10px;
  }
`;

function Trends() {
  const [trends, setTrends] = useState([]);
  const [woeid, setWoeid] = useState("1");
  useEffect(() => {
    getTrends();
  }, [woeid]);
  function getTrends() {
    axios
      .get("/api/trends", {
        params: {
          woeid,
        },
      })
      .then((response) => {
        setTrends(response.data[0].trends);
      })
      .catch((error) => console.log(error.message));
  }
  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get("/api/near-me", {
              params: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            })
            .then((response) => {
              setWoeid(response.data[0].woeid);
            })
            .catch((error) => console.log(error.message));
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      alert(`Geolocation not supported`);
    }
  }
  function listTrends() {
    return (
      <ul>
        {trends.map((trend: any, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{trend.name}</a>
              {trend.tweet_volume && (
                <TweetVolume>{trend.tweet_volume}</TweetVolume>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <header className="headers shrinkDisabled">
        <Content>
          <div className="navbar">
            <Brand>
              <Link to="/">
                <span className="Icon"></span>
              </Link>
            </Brand>
            <Switch>
              <Link to="/">
                <span className="LinkLongCopy">Twitter Profile</span>
              </Link>
            </Switch>
          </div>
          <h1 className="title">Twitter Trends</h1>
          <Menu>
            <Select
              name="trending-place"
              onChange={(e) => setWoeid(e.target.value)}
            >
              <option value="1">Worldwide</option>
              <option value="23424868">South Korea, KR</option>
              <option value="23424856">Japan, JP</option>
              <option value="2459115">New York,US</option>
              <option value="44418">London, UK</option>
              <option value="638242">Berlin, DE</option>
              <option value="615702">Paris, FR</option>
              <option value="1105779">Sydney, AU</option>
            </Select>
            <Location onClick={handleLocation}>
              <FaCrosshairs />
            </Location>
          </Menu>
          <List>{listTrends()}</List>
        </Content>
      </header>
    </>
  );
}
export default Trends;