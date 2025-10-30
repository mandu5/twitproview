import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Twitter from "twitter"; // v1.1 API for trends/near-me
import axios from "axios";

// OpenAI API configuration for AI-generated tweet content
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Twitter API v1.1 client for trends/near-me (keeping original functionality)
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

// Environment variable check
if (!OPENAI_API_KEY) {
  console.warn(
    "⚠️  Warning: OPENAI_API_KEY is not set. AI tweet generation will use fallback mode."
  );
}

/**
 * Generates a random engagement count within a realistic range
 * 
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer between min and max (inclusive)
 * 
 * Rationale: Simulates realistic social media engagement patterns
 * with variability that mirrors real-world post performance
 */
const getRandomEngagement = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random timestamp within the last 30 days
 * 
 * @returns ISO timestamp string
 * 
 * Rationale: Creates realistic post timelines spanning recent activity
 */
const getRandomTimestamp = (): string => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const timestamp = new Date(
    now.getTime() - 
    (daysAgo * 24 * 60 * 60 * 1000) - 
    (hoursAgo * 60 * 60 * 1000) - 
    (minutesAgo * 60 * 1000)
  );
  
  return timestamp.toISOString();
};

/**
 * Generates synthetic user profile data
 * 
 * @param username - The username to generate profile for
 * @returns User profile object matching Twitter API v2 schema
 * 
 * Rationale: Creates consistent user identity across generated posts.
 * Uses deterministic formatting to maintain professional appearance.
 */
const generateUserProfile = (username: string) => {
  const cleanUsername = username.replace(/^@/, "").toLowerCase();
  const capitalizedName = cleanUsername
    .split(/[._-]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  
  return {
    id: `user_${cleanUsername}_${Date.now()}`,
    name: capitalizedName,
    username: cleanUsername,
    profile_image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
  };
};

/**
 * Generates AI-powered synthetic tweet content using OpenAI API
 * 
 * @param username - The username to generate tweets for
 * @param count - Number of tweets to generate (default: 10)
 * @returns Array of tweet content strings
 * 
 * Rationale: Uses OpenAI's language model to create contextually appropriate,
 * username-specific content that mimics real social media posting patterns.
 * Falls back to template-based generation if API is unavailable.
 */
const generateTweetContent = async (username: string, count: number = 10): Promise<string[]> => {
  if (!OPENAI_API_KEY) {
    // Fallback: Generate simple template-based tweets
    return generateFallbackTweets(username, count);
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a social media content generator. Create realistic, diverse tweets that could be posted by a user. Make them varied in topic, tone, and length. Include occasional hashtags and mentions naturally."
          },
          {
            role: "user",
            content: `Generate ${count} realistic tweet texts for a user named @${username}. Return ONLY a JSON array of strings, no other text. Each tweet should be unique and varied in content, ranging from 10-280 characters. Mix personal updates, thoughts, opinions, and observations.`
          }
        ],
        temperature: 0.9,
        max_tokens: 1500,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const tweets = JSON.parse(content);
    return Array.isArray(tweets) ? tweets : generateFallbackTweets(username, count);
  } catch (error: any) {
    console.error("OpenAI API error, using fallback:", error.message);
    return generateFallbackTweets(username, count);
  }
};

/**
 * Generates fallback tweets when AI service is unavailable
 * 
 * @param username - The username to generate tweets for
 * @param count - Number of tweets to generate
 * @returns Array of template-based tweet strings
 * 
 * Rationale: Ensures application functionality even without external API access.
 * Uses varied templates to simulate realistic posting diversity.
 */
const generateFallbackTweets = (username: string, count: number): string[] => {
  const templates = [
    `Just finished an amazing project! 🚀 #coding #developer`,
    `Coffee and code, the perfect combination ☕💻`,
    `Thoughts on the latest tech trends... 🤔`,
    `Happy ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}! Hope everyone has a great day! ✨`,
    `Learning something new every day 📚 #growth #learning`,
    `Sometimes you just need to take a break and recharge 🔋`,
    `Working on something exciting! Can't wait to share more soon 👀`,
    `The best part of my day? Finally solving that bug! 🐛✅`,
    `Anyone else excited about the weekend? 🎉`,
    `Just had the best idea! Time to build it 💡`,
    `Reading an amazing book right now 📖 Highly recommend!`,
    `Productivity tip: Break big tasks into small ones ✅`,
    `Beautiful weather today! ☀️ Perfect for a walk`,
    `Late night coding session 🌙 Who else is up?`,
    `Just deployed to production! 🚀 #DevOps #CICD`,
    `Remember to drink water and stretch! 💧🧘`,
    `This is why I love what I do ❤️ #passion`,
    `Quick question: What's your favorite programming language? 🤔`,
    `Friday vibes! 🎊 Any weekend plans?`,
    `Just discovered an awesome new tool! Game changer 🔧`,
  ];

  const tweets: string[] = [];
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    tweets.push(template);
  }
  return tweets;
};

/**
 * Extracts hashtags and URLs from tweet text
 * 
 * @param text - The tweet text to parse
 * @returns Object containing hashtags and urls arrays
 * 
 * Rationale: Maintains compatibility with Twitter API v2 response schema
 * by properly structuring entities for frontend consumption
 */
const extractEntities = (text: string) => {
  const hashtags: Array<{ start: number; end: number; tag: string }> = [];
  const urls: Array<{
    start: number;
    end: number;
    url: string;
    display_url: string;
    expanded_url: string;
  }> = [];

  // Extract hashtags
  const hashtagRegex = /#(\w+)/g;
  let match;
  while ((match = hashtagRegex.exec(text)) !== null) {
    hashtags.push({
      start: match.index,
      end: match.index + match[0].length,
      tag: match[1],
    });
  }

  // Extract URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    urls.push({
      start: match.index,
      end: match.index + url.length,
      url: url,
      display_url: url.replace(/^https?:\/\//, "").slice(0, 30) + "...",
      expanded_url: url,
    });
  }

  return { hashtags, urls };
};

// Health check endpoint
router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "API working - AI Tweet Simulator v1.0" });
});

/**
 * AI-powered timeline generator endpoint
 * 
 * Generates synthetic tweets with realistic content, metrics, and timestamps
 * Returns data in Twitter API v2 format for frontend compatibility
 * 
 * @route GET /api/timeline
 * @queryparam screen_name - Username to generate tweets for (required)
 * @returns Twitter API v2 compatible response with generated tweets
 * 
 * Rationale: Replaces real Twitter API with AI-generated content while
 * maintaining exact same response structure for seamless frontend integration.
 * Enables unlimited tweet generation without API rate limits or costs.
 */
router.get("/timeline", async (req: Request, res: Response) => {
  const screen_name = (req.query.screen_name || "")
    .toString()
    .replace(/^@/, "");
    
  if (!screen_name) {
    return res.status(400).json({ error: "screen_name is required" });
  }

  try {
    console.log(`Generating AI tweets for user: @${screen_name}`);
    
    // Generate user profile
    const user = generateUserProfile(screen_name);
    
    // Generate tweet contents using AI
    const tweetContents = await generateTweetContent(screen_name, 15);
    
    // Generate full tweet objects with metadata
    const tweets = tweetContents.map((text, index) => {
      const entities = extractEntities(text);
      
      return {
        id: `tweet_${screen_name}_${Date.now()}_${index}`,
        text: text,
        created_at: getRandomTimestamp(),
        author_id: user.id,
        public_metrics: {
          retweet_count: getRandomEngagement(0, 500),
          reply_count: getRandomEngagement(0, 100),
          like_count: getRandomEngagement(0, 1000),
          quote_count: getRandomEngagement(0, 50),
        },
        entities: {
          hashtags: entities.hashtags,
          urls: entities.urls,
        },
      };
    });

    // Return in Twitter API v2 format
    const response = {
      data: tweets,
      includes: {
        users: [user],
      },
      meta: {
        result_count: tweets.length,
        newest_id: tweets[0].id,
        oldest_id: tweets[tweets.length - 1].id,
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error("Error generating timeline:", error.message, error);
    res.status(500).json({
      error: "Failed to generate timeline",
      details: error.message,
    });
  }
});

// Twitter trends endpoints (keeping original functionality)
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
