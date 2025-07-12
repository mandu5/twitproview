import { SetStateAction, useEffect, useState } from "react";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";

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
  margin-top: 20px;
  margin-bottom: 30px;
`;
const Select = styled.select`
  margin: 16px;
  padding: 8px;
  font-size: 16px;
  border-radius: 999px;
  border-color: #aab8c2;
  border-width: 2px;
  background-color: #fff;
  color: #333;
`;
const TweetVolume = styled.span`
  font-size: 12px;
  background-color: #1da1f2;
  color: #f5f8fa;
  border-radius: 999px;
  padding: 2px 6px;
  margin-left: 8px;
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
const List = styled.div`
  width: 70%;
  margin: 0 auto;
  color: #fff;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    background-color: #1a202c;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a {
    color: #1da1f2;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Title = styled.h1`
  color: #fff;
  margin-top: 30px;
  font-size: 2.5em;
`;

function Trends() {
  const [trends, setTrends] = useState([]);
  const [woeid, setWoeid] = useState("1");

  useEffect(() => {
    getTrends();
  }, [woeid]);

  async function getTrends() {
    try {
      const response = await axios.get("/api/trends", {
        params: {
          woeid,
        },
      });
      setTrends(response.data[0]?.trends || []);
    } catch (error: any) {
      console.error(
        "Failed to fetch trends:",
        error.response?.data?.details || error.message
      );
      setTrends([]);
    }
  }

  async function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get("/api/near-me", {
              params: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            });
            setWoeid(response.data[0]?.woeid || "1");
          } catch (error: any) {
            console.error(
              "Failed to fetch nearby location:",
              error.response?.data?.details || error.message
            );
            alert(
              `Failed to get nearby trends: ${
                error.response?.data?.details || error.message
              }`
            );
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          alert(`Geolocation Error: ${error.message}`);
        }
      );
    } else {
      alert(`Geolocation not supported by your browser`);
    }
  }

  const listTrends = () => {
    return (
      <ul>
        {trends.length > 0 ? (
          trends.map((trend: any, index) => (
            <li key={index}>
              <a href={trend.url} target="_blank" rel="noopener noreferrer">
                {trend.name}
              </a>
              {trend.tweet_volume && (
                <TweetVolume>{trend.tweet_volume.toLocaleString()}</TweetVolume>
              )}
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#8899a6" }}>
            No trends found for this location.
          </p>
        )}
      </ul>
    );
  };

  return (
    <>
      <Navbar />
      <Content>
        <Title>Twitter Trends</Title>
        <Menu>
          <Select
            name="trending-place"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setWoeid(e.target.value)
            }
            value={woeid}
          >
            <option value="1">Worldwide</option>
            <option value="23424868">South Korea, KR</option>
            <option value="23424856">Japan, JP</option>
            <option value="2459115">New York, US</option>
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
    </>
  );
}
export default Trends;
