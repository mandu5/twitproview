import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaRetweet, FaRegHeart } from "react-icons/fa";
import { errorAtom, hiddenAtom, searchTypedAtom } from "../atom";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";

// Styled Components 정의 (이전과 유사하지만 v2 응답 구조에 맞게 일부 수정)
const List = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  color: #fff;
  li {
    position: relative;
    width: 70%;
    margin: 20px auto; // 중앙 정렬 및 간격
    padding: 15px;
    background-color: #1a202c; // 어두운 배경색
    border-radius: 8px; // 둥근 모서리
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 그림자 효과
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    border-radius: 50%;
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
  .select {
    margin: 16px;
    font-size: 16px;
    border-radius: 999px;
    border-color: #aab8c2;
    border-width: 2px;
    padding: 8px 12px;
    background-color: #fff;
    color: #333;
  }
`;
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Name = styled.span`
  font-weight: bold;
  color: #fff;
  margin-right: 5px;
`;
const Username = styled.span`
  color: #8899a6;
  font-size: 0.9em;
`;
const Text = styled.div`
  margin: 10px 0;
  font-weight: 200;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
`;
const HashTagContainer = styled.div`
  margin-top: 5px;
`;
const Hash = styled.a`
  color: #1da1f2;
  text-decoration: none;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;
const URLDisplay = styled.a`
  color: #1da1f2;
  text-decoration: none;
  word-break: break-all;
  margin-top: 5px;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;
const Photo = styled.img`
  max-width: 100%;
  border-radius: 10px;
  margin-top: 15px;
  height: auto;
`;
const DateDisplay = styled.div`
  color: #8899a6;
  font-size: 0.85em;
  margin-top: 10px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
`;
const Metrics = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Like = styled.div`
  display: flex;
  align-items: center;
  color: #e0245e;
  font-size: 0.9em;
  margin-right: 20px;
  svg {
    margin-right: 5px;
  }
`;
const Retweet = styled.div`
  display: flex;
  align-items: center;
  color: #17bf63;
  font-size: 0.9em;
  svg {
    margin-right: 5px;
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

interface TweetData {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  entities?: {
    hashtags?: Array<{ start: number; end: number; tag: string }>;
    urls?: Array<{
      start: number;
      end: number;
      url: string;
      display_url: string;
      expanded_url: string;
    }>;
    media?: Array<{ media_key: string; type: string; url: string }>;
  };
}

interface UserData {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

interface TwitterV2Response {
  data?: TweetData[];
  includes?: {
    users?: UserData[];
  };
  meta?: any;
}

const Timeline = () => {
  const [timeline, setTimeline] = useState<TweetData[]>([]);
  const [sort, setSort] = useState("date");
  const screen_name = useRecoilValue(searchTypedAtom);
  const hidden = useRecoilValue(hiddenAtom);
  const setError = useSetRecoilState(errorAtom);
  const [users, setUsers] = useState<{ [key: string]: UserData }>({});

  useEffect(() => {
    if (screen_name) {
      getTimeline();
    } else {
      setTimeline([]);
      setUsers({});
      setError("");
    }
  }, [screen_name]);

  useEffect(() => {}, [sort, timeline]);

  const getTimeline = async () => {
    setError("");
    try {
      const response = await axios.get<TwitterV2Response>("/api/timeline", {
        params: {
          screen_name,
        },
      });
      setTimeline(response.data.data || []);

      const userMap: { [key: string]: UserData } = {};
      if (response.data.includes?.users) {
        response.data.includes.users.forEach((user) => {
          userMap[user.id] = user;
        });
      }
      setUsers(userMap);
    } catch (error: any) {
      console.error("Failed to fetch timeline:", error);
      setError(
        error.response?.data?.details ||
          "Failed to load timeline. Please check username or server status."
      );
      setTimeline([]);
      setUsers({});
    }
  };

  const renderTimeline = () => {
    const sortedTimeline = [...timeline].sort((a, b) => {
      if (sort === "date") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sort === "like") {
        return (
          (b.public_metrics?.like_count || 0) -
          (a.public_metrics?.like_count || 0)
        );
      } else {
        return (
          (b.public_metrics?.retweet_count || 0) -
          (a.public_metrics?.retweet_count || 0)
        );
      }
    });

    return (
      <List>
        <div className={hidden === "active" ? "active" : "hidden"}>
          <span>Sort by:</span>
          <select className="select" onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date</option>
            <option value="like">Likes</option>
            <option value="retweet">Retweets</option>
          </select>
        </div>
        <ul>
          {sortedTimeline.length > 0 ? (
            sortedTimeline.map((tweet) => {
              const user = users[tweet.author_id] || {};

              const hashtags = tweet.entities?.hashtags || [];
              const urls = tweet.entities?.urls || [];
              const media = tweet.entities?.media || [];

              return (
                <li key={tweet.id}>
                  <HeaderInfo>
                    <a
                      href={`https://twitter.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="profile"
                        src={
                          user.profile_image_url ||
                          "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                        }
                        alt={`${user.name || "User"}'s profile`}
                      />
                    </a>
                    <div>
                      <Name>{user.name || "Unknown User"}</Name>
                      <Username>@{user.username || "unknown_user"}</Username>
                    </div>
                  </HeaderInfo>

                  <Text>{tweet.text}</Text>

                  {hashtags.length > 0 && (
                    <HashTagContainer>
                      {hashtags.map((hash, i) => (
                        <Hash
                          key={`hash-${tweet.id}-${i}`}
                          href={`https://twitter.com/hashtag/${hash.tag}?src=hashtag_click`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          #{hash.tag}
                        </Hash>
                      ))}
                    </HashTagContainer>
                  )}

                  {urls.length > 0 && (
                    <div>
                      {urls.map((url, i) => (
                        <URLDisplay
                          key={`url-${tweet.id}-${i}`}
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.display_url}
                        </URLDisplay>
                      ))}
                    </div>
                  )}

                  {media.length > 0 && media[0].url && (
                    <Photo
                      className="pic"
                      src={media[0].url}
                      alt="Tweet Media"
                    />
                  )}

                  <DateDisplay>
                    {moment(tweet.created_at).format("llll")}
                  </DateDisplay>

                  <Metrics>
                    <Like>
                      <FaRegHeart /> {tweet.public_metrics?.like_count || 0}
                    </Like>
                    <Retweet>
                      <FaRetweet /> {tweet.public_metrics?.retweet_count || 0}
                    </Retweet>
                  </Metrics>
                </li>
              );
            })
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#8899a6",
                marginTop: "50px",
              }}
            >
              {screen_name
                ? "No tweets found or invalid username. Please try again."
                : "Search for a Twitter user to see their timeline."}
            </p>
          )}
        </ul>
      </List>
    );
  };

  return (
    <>
      <Navbar />
      <Content>
        <InputBox />
      </Content>
      {renderTimeline()}
      <Footer />
    </>
  );
};

export default Timeline;
