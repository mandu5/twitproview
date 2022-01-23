import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaRetweet } from "react-icons/fa";
import { searchTypedAtom } from "../atom";
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
const Header = styled.div`
  float: left;
`;
const Body = styled.div``;
const Date = styled.div``;
const Like = styled.div``;
const Retweet = styled.div``;

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
    // map sort구현(리엑트 map sort)
    return (
      <ul>
        {timeline.map((timeline: any) => {
          return (
            <>
              {/* <a href={timeline.urls.url}> */}
              <li>
                <img
                  className="profile"
                  src={`${timeline.user.profile_image_url}`}
                  alt="profile"
                />
                <div>{timeline.user.name}</div>
                <div>@{timeline.user.screen_name}</div>
                <div>{timeline.text}</div>
                {/* <div>{hashtag()}</div> */}
                {/* <img className="thumbnail" src={img()} alt="thumbnail" /> */}
                <div>{timeline.created_at}</div>
                <div>🤍{timeline.favorite_count}</div>
                <div>
                  <FaRetweet />
                  {timeline.retweet_count}
                </div>
              </li>
              {/* </a> */}
            </>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <div>
        <Publish className="is-shrinkDisabled">
          <div className="content">
            <div className="u-cf">
              <h1 className="brand">
                <div className="u-textInheritColor">
                  <span className="logo Icon Icon--twitter"></span>
                </div>
              </h1>
              <p className="Link">
                <Link to="/trends">
                  <span className="LinkLongCopy">Twitter Trends</span>
                </Link>
              </p>
            </div>
            <MainInput>
              <h1 className="WidgetQuery-prompt">Twitter Profile Viewer</h1>
              <Main>
                <Input
                  type="text"
                  id="configuration-query"
                  placeholder="Enter a Twitter UserId"
                  onKeyPress={onEnter}
                />
              </Main>
            </MainInput>
          </div>
        </Publish>
      </div>
      <div className="section full-height over-hide"></div>
      <div className="content">{listTimeline()}</div>
      <ul className="content">
        <li>
          <Header>
            <div>프사</div>
            <div>이름</div>
            <div>아이디</div>
          </Header>
          <Body>
            <div>텍스트</div>
            <div>해쉬테그(optional)</div>
            <div>사진(optional)</div>
          </Body>
          <Date>날짜</Date>
          <Like>좋아요</Like>
          <Retweet>리트윗</Retweet>
        </li>
      </ul>
    </>
  );
}

export default Timeline;
