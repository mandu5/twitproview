import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaRetweet } from "react-icons/fa";
import { errorAtom, hiddenAtom, searchTypedAtom } from "../atom";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";

const List = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  li {
    position: relative;
    width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    box-sizing: border-box;
  }
  .hidden {
    visibility: hidden;
    &.active {
      visibility: visible;
    }
  }
  .profile {
    float: left;
    margin-right: 10px;
  }
  .select {
    margin: 16px;
    font-size: 16px;
    border-radius: 999px;
    border-color: #aab8c2;
    border-width: 2px;
  }
`;
const Name = styled.div`
  float: left;
`;
const Text = styled.div`
  margin: 10px;
  font-weight: 200;
  font-size: 16px;
`;
const Hash = styled.div`
  margin-left: 10px;
`;
const Photo = styled.img`
  position: relative;
  width: 90%;
  max-height: 450px;
  top: 50%;
  left: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
  transform: translate(-50%, 0%);
  box-sizing: border-box;
`;
const Date = styled.div`
  margin-left: 10px;
`;
const Like = styled.div`
  float: left;
  margin-left: 10px;
`;
const Retweet = styled.div`
  float: left;
  margin-left: 10px;
`;
const Content = styled.div`
  height: 100%;
  padding: 0 15px;
  max-width: 1160px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
`;

const Timeline = () => {
  const [timeline, setTimeline] = useState<any>([]);
  const [sort, setSort] = useState("date");
  const screen_name = useRecoilValue(searchTypedAtom);
  const hidden = useRecoilValue(hiddenAtom);
  const setError = useSetRecoilState(errorAtom);

  useEffect(() => {
    getTimeline();
    listTimeline();
  }, [screen_name, setSort]);

  const getTimeline = () => {
    axios
      .get("/api/timeline", {
        params: {
          screen_name,
        },
      })
      .then((response) => {
        setTimeline(response.data);
        setError("");
      })
      .catch(() => setError("Invalid UserId"));
  };
  const listTimeline = () => {
    if (sort === "date") {
      timeline.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
    } else if (sort === "like") {
      timeline.sort(
        (a: { favorite_count: number }, b: { favorite_count: number }) =>
          b.favorite_count - a.favorite_count
      );
    } else {
      timeline.sort(
        (a: { retweet_count: number }, b: { retweet_count: number }) =>
          b.retweet_count - a.retweet_count
      );
    }
    return (
      <List>
        <div className={hidden}>
          <span>Sort by:</span>
          <select className="select" onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date</option>
            <option value="like">Likes</option>
            <option value="retweet">Retweets</option>
          </select>
        </div>
        <ul>
          {timeline.map((timeline: any) => {
            return (
              <>
                <li>
                  <a href={`https://twitter.com/${timeline.user.screen_name}`}>
                    <img
                      className="profile"
                      src={`${timeline.user.profile_image_url}`}
                      alt="profile"
                    />
                    <Name>{timeline.user.name}</Name>
                    <br />
                    <div>@{timeline.user.screen_name}</div>
                  </a>
                  <br />
                  <div>
                    <Text>{timeline.text}</Text>
                    {typeof timeline.entities.hashtags[0] === "undefined" ? (
                      <></>
                    ) : (
                      <a
                        href={`https://twitter.com/hashtag/${timeline.entities.hashtags[0].text}?src=hashtag_click`}
                      >
                        <Hash>#{timeline.entities.hashtags[0].text}</Hash>
                      </a>
                    )}
                    {typeof timeline.entities.media === "undefined" ? (
                      <></>
                    ) : (
                      <Photo
                        className="pic"
                        src={`${timeline.entities.media[0].media_url}`}
                        alt="pic"
                      />
                    )}
                  </div>
                  <Date>
                    {moment(`${timeline.created_at}`).format("llll")}
                    {/* {timeline.created_at} */}
                  </Date>
                  <Like>❤️{timeline.favorite_count}</Like>
                  <Retweet>
                    <FaRetweet />
                    {timeline.retweet_count}
                  </Retweet>
                </li>
              </>
            );
          })}
        </ul>
      </List>
    );
  };

  return (
    <>
      <header className="header shrinkDisabled">
        <Content>
          <Navbar />
          <InputBox />
        </Content>
      </header>
      {listTimeline()}
      <Footer />
    </>
  );
};

export default Timeline;
