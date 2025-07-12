import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Twitter from "twitter"; // v1.1 API for trends/near-me
import axios from "axios"; // v2 API for timeline

// Twitter API v2 Bearer Token
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Twitter API v1.1 client for trends/near-me
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

// 환경 변수 누락 체크 (서버 시작 시점에 경고)
if (
  !BEARER_TOKEN ||
  !process.env.TWITTER_CONSUMER_API_KEY ||
  !process.env.TWITTER_CONSUMER_API_SECRET ||
  !process.env.TWITTER_ACCESS_TOKEN ||
  !process.env.TWITTER_ACCESS_SECRET
) {
  console.warn(
    "🚨 경고: Twitter API 환경변수 중 일부가 누락되었습니다. .env 파일을 확인해주세요."
  );
  console.warn("  - TWITTER_BEARER_TOKEN (v2 API에 필요)");
  console.warn(
    "  - TWITTER_CONSUMER_API_KEY, TWITTER_CONSUMER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET (v1.1 API에 필요)"
  );
}

// 기본 API 동작 확인 (선택 사항)
router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "API working" });
});

// v2 Twitter API를 사용한 타임라인 가져오기
router.get("/timeline", async (req: Request, res: Response) => {
  const screen_name = (req.query.screen_name || "")
    .toString()
    .replace(/^@/, ""); // @ 제거
  if (!screen_name) {
    return res.status(400).json({ error: "screen_name is required" });
  }

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/${screen_name}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data); // v2 응답을 그대로 반환
  } catch (error: any) {
    console.error(
      "Error fetching timeline:",
      error.response?.data || error.message,
      error
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch timeline",
      details: error.response?.data || error.message,
    });
  }
});

// v1.1 Twitter API를 사용한 트렌드 가져오기
router.get(
  "/trends",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const woeid = req.query.woeid;
      if (!woeid) {
        return res.status(400).json({ error: "woeid is required" });
      }
      const trends = await client.get("trends/place", {
        id: woeid,
      });
      res.send(trends);
    } catch (error: any) {
      console.error("Error fetching trends:", error.message, error);
      res
        .status(500)
        .json({ error: "Failed to fetch trends", details: error.message });
    }
  }
);

// v1.1 Twitter API를 사용한 근처 트렌드 가져오기
router.get(
  "/near-me",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, long } = req.query;
      if (!lat || !long) {
        return res.status(400).json({ error: "lat and long are required" });
      }
      const response = await client.get("/trends/closest", {
        lat,
        long,
      });
      res.send(response);
    } catch (error: any) {
      console.error("Error fetching near-me trends:", error.message, error);
      res.status(500).json({
        error: "Failed to fetch nearby trends",
        details: error.message,
      });
    }
  }
);

export default router;
