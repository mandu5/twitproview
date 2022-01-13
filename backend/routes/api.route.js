const router = require("express").Router();
const Twitter = require("twitter");
// const Twitter = require("twitter-v2");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

// router.get("/tweets", async (req, res, next) => {
//   const { data } = await client.get("tweets", { id: "12" });
//   res.send(data);
// });

router.get("/statuses", async (req, res, next) => {
  const timeline = await client.get("statuses/home_timeline.json", {});
  res.send(timeline);
});

module.exports = router;
