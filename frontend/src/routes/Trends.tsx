import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";

const Publish = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(135deg, #dcc3fc, #9ac5fc);
  color: #ffffff;
  height: 87vh;
  min-height: 50px;
  z-index: 1;
  font-weight: 300;
  letter-spacing: 0.0357em;
  @media (max-width: 420px) {
    height: 77vh;
  }
`;
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
const TweetVolume = styled.span`
  font-size: 12px;
  background-color: var(--primary-color);
  color: #f5f8fa;
  border-radius: 999px;
  padding: 2px 4px;
  margin-left: 4px;
  font-weight: bold;
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
      <ul className="content">
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
      <Publish className="is-shrinkDisabled">
        <div className="content">
          <div className="u-cf">
            <h1 className="brand">
              <div className="u-textInheritColor">
                <span className="logo Icon Icon--twitter"></span>
              </div>
            </h1>
            <p className="Link">
              <Link to="/">
                <span className="LinkLongCopy">
                  Twitter Profile
                </span>
              </Link>
            </p>
          </div>
          <h1 className="WidgetQuery-prompt">Twitter Trends</h1>
          <Menu>
            <select
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
            </select>
            <Location onClick={handleLocation}>
              <FaCrosshairs />
            </Location>
          </Menu>
          <div className="content">{listTrends()}</div>
        </div>
      </Publish>
    </>
  );
}
export default Trends;
