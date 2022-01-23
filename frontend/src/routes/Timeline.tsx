import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaRetweet } from "react-icons/fa";
import { searchTypedAtom } from "../atom";
import axios from "axios";
import styled from "styled-components";

const Header = styled.div`
  .profile {
    float: left;
  }
`;
const Name = styled.div`
  float: left;
`;
const Id = styled.div``;

const Body = styled.div``;
const Text = styled.div``;
const Hash = styled.div``;
const Photo = styled.div``;

const Date = styled.div``;
const Like = styled.div`
  float: left;
`;
const Retweet = styled.div`
  float: left;
  margin-left: 10px;
`;

const MainInput = styled.div`
  position: relative;
  top: calc(50% - 50px);
  transform: translateY(-50%);
  opacity: 1;
  transition: opacity 0.6s;
`;
const Main = styled.section`
  position: relative;
  width: 580px;
  max-width: 90%;
  margin: 15px auto 5px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 15px 36px 15px 20px;
  border: 0;
  border-radius: 4px;
  background: #fff;
  color: #292f33;
  &::placeholder {
    color: #8899a6;
    font-weight: 300;
    letter-spacing: 0.0357em;
    text-overflow: ellipsis !important;
  }
`;
const Content = styled.div`
  height: 100%;
  padding: 0 15px;
  max-width: 1160px;
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
`;
const List = styled.div`
  max-width: 1160px;
  margin: auto;
`;
const A = styled.p`
  position: relative;
  float: right;
  line-height: 50px;
  z-index: 2;
`;

function Timeline() {
  const setId = useSetRecoilState(searchTypedAtom);
  const onEnter = (event: any) => {
    if (event.key === "Enter") {
      setId(event.currentTarget.value);
    }
  };
  const [timeline, setTimeline] = useState<any>([]);
  const sreen_name = useRecoilValue(searchTypedAtom);

  useEffect(() => {
    getTimeline();
  }, [sreen_name]);

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
  // const hashtag = () => {
  //   if (typeof timeline[1].entities.hashtags[0].text === undefined) {
  //     return "no";
  //   }
  //   return "yes";
  // };
  // const img = () => {
  //   let img = timeline[10].entities.media[0].media_url;
  //   return img;
  // }; //undefined 해결법 공부  (리엑트 undefined)
  function listTimeline() {

    // // 최신순
    // timeline.sort();
    // // 좋아요순
    // timeline.sort((a: { favorite_count: number; },b: { favorite_count: number; })=>a.favorite_count-b.favorite_count);
    // // 리트윗순
    // timeline.sort((a: { retweet_count: number; },b: { retweet_count: number; })=>a.retweet_count-b.retweet_count);

    return (
      <List>
        <ul>
          {timeline.map((timeline: any) => {
            return (
              <>
                {/* <a href={timeline.urls.url}> */}
                <li>
                  <Header>
                    <img
                      className="profile"
                      src={`${timeline.user.profile_image_url}`}
                      alt="profile"
                    />
                    <Name>{timeline.user.name}</Name>
                    <br />
                    <Id>@{timeline.user.screen_name}</Id>
                  </Header>
                  <br />
                  <Body>
                    <Text>{timeline.text}</Text>
                    <Hash>해쉬테그(optional)</Hash>
                    <Photo>사진(optional)</Photo>
                  </Body>
                  <Date>{timeline.created_at}</Date>
                  <Like>🤍{timeline.favorite_count}</Like>
                  <Retweet>
                    <FaRetweet />
                    {timeline.retweet_count}
                  </Retweet>
                </li>
                {/* </a> */}
              </>
            );
          })}
        </ul>
      </List>
    );
  }
console.log(timeline)
  return (
    <>
      <header className="header shrinkDisabled">
        <Content>
          <div className="navbar">
            <Brand>
              <a href="https://twitter.com">
                <span className="Icon"></span>
              </a>
            </Brand>
            <A>
              <Link to="/trends">
                <span className="LinkLongCopy">Twitter Trends</span>
              </Link>
            </A>
          </div>
          <MainInput>
            <h1 className="title">Twitter Profile Viewer</h1>
            <Main>
              <Input
                type="text"
                placeholder="Enter a Twitter UserId"
                onKeyPress={onEnter}
              />
            </Main>
          </MainInput>
        </Content>
      </header>
      <List>{listTimeline()}</List>
    </>
  );
}

export default Timeline;
