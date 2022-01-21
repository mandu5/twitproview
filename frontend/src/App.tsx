import { useState, useEffect } from "react";
import logo from "./twitter.svg";
import "./App.css";
import { FaCrosshairs } from "react-icons/fa";
import axios from "axios";
import { Homepage } from "./routes/Homepage";
import { useRecoilValue } from "recoil";
import { searchTypedAtom } from "./atom";

function App() {
  const [trends, setTrends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [woeid, setWoeid] = useState("1");
  const sreen_name = useRecoilValue(searchTypedAtom);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {getTimeline(); getTrends()}, [woeid, sreen_name]);

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

  function getTimeline() {
    axios
      .get("/api/timeline", {
        params: {
          sreen_name,
        },
      })
      .then((response) => {
        setTimeline(response.data);
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
        {trends.map((trend:any, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{trend.name}</a>
              {trend.tweet_volume && (
                <span className="tweet_volume">{trend.tweet_volume}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  function listTimeline() {
    return (
      <ul>
        {timeline.map((timeline:any, index) => {
          return (
            <li key={index}>
              <div>{timeline.text}</div>
              <div>{timeline.retweet_count}</div>
              <div>{timeline.favorite_count}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="twitter" />
        <h3>Twitter Trends</h3>
      </header>
      <div className="menu">
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
        <div className="location" onClick={handleLocation}>
          <FaCrosshairs />
        </div>
      </div>
      <div className="content">{listTrends()}</div>
      <Homepage />
      <div className="content">{listTimeline()}</div>
    </div>
  );
}

export default App;
