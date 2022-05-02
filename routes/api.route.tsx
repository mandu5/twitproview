export const router = require("express").Router();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});
router.get("/", async (req, res, next) => {
  res.send({ message: "API working" });
});
router.get("/timeline", async (req, res, next) => {
  try {
    const id = req.query.screen_name;
    const timeline = await client.get("statuses/user_timeline", {
      screen_name: id,
      exclude_replies: true,
      include_rts: false,
      count: 200,
    });
    res.send(timeline);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.get("/trends", async (req, res, next) => {
  try { 
    const id = req.query.woeid;
    const trends = await client.get("trends/place", {
      id,
    });
    res.send(trends);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.get("/near-me", async (req, res, next) => {
  try {
    const { lat, long } = req.query;
    const response = await client.get("/trends/closest", {
      lat,
      long,
    });
    res.send(response);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
