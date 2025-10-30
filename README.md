# 💡 Topic

- **AI-Powered X/Twitter Post Simulator**
- An application to find and generate realistic-looking posts for any X (formerly Twitter) user handle using AI.

# 📝 Summary

This application uses AI to generate realistic-looking X/Twitter posts for any user handle. Instead of fetching real tweets from the Twitter API (which has rate limits and costs), it creates synthetic posts that look and feel authentic. The generated posts include realistic engagement metrics (likes, retweets), timestamps, hashtags, and user profiles. All posts can be sorted by recency, likes, or retweets for easy exploration.

**Key Innovation**: By leveraging OpenAI's language models, the application can generate contextually appropriate, username-specific content that mimics real social media posting patterns. When the OpenAI API is unavailable, it falls back to template-based generation to ensure consistent functionality.

# ⭐️ Key Features

## **AI Tweet Generation**
- **AI-Powered Content**: Uses OpenAI GPT-3.5 to generate realistic, diverse tweet content
- **Fallback Mode**: Template-based generation when AI service is unavailable
- **User Profiles**: Automatically generates profile data including avatar, display name, and username
- **Realistic Metrics**: Simulates engagement with varied likes, retweets, replies, and quotes
- **Timestamp Simulation**: Generates posts distributed across the last 30 days

## **Sorting & Filtering**
- **Sort by Date**: View posts in chronological order (newest first)
- **Sort by Likes**: See most popular posts by like count
- **Sort by Retweets**: Discover most shared content by retweet count

## **Twitter Trends** (Original Feature)
- View Twitter trends by location and in real-time
- Requires Twitter API credentials (optional)

# 🛠 Tech Stack

**Frontend**: `React`, `TypeScript`, `Recoil`, `styled-components`, `Vite`, `Axios`, `React Router`, `Moment.js`

**Backend**: `Node.js`, `Express`, `TypeScript`, `OpenAI API`, `Twitter API v1.1/v2`

**AI/ML**: `OpenAI GPT-3.5-turbo` for content generation

# 🚀 Getting Started

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (optional, for AI-generated content)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd twitproview
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install
cd ..
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key (optional)
```

4. **Build the frontend**
```bash
cd frontend
npm run build
cd ..
mv frontend/dist ./build
```

5. **Start the server**
```bash
npm start
```

6. **Access the application**
Open your browser to `http://localhost:3000`

## Development Mode

Run frontend and backend separately for development:

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

# 🎯 How It Works

## Architecture

```
User Input (Username)
      ↓
Frontend (React + Recoil)
      ↓
API Request (/api/timeline?screen_name=...)
      ↓
Backend (Express)
      ↓
AI Generator (OpenAI GPT-3.5 or Fallback)
      ↓
Synthetic Tweet Data
      ↓
Twitter API v2 Format Response
      ↓
Frontend Display + Sorting
```

## Tweet Generation Process

1. **User Profile Creation**: Generates consistent profile data (name, username, avatar)
2. **Content Generation**: 
   - **AI Mode**: Calls OpenAI API to generate contextually relevant tweets
   - **Fallback Mode**: Uses curated templates for realistic variety
3. **Entity Extraction**: Parses hashtags and URLs from generated text
4. **Metrics Simulation**: Assigns random but realistic engagement numbers
5. **Timestamp Generation**: Distributes posts across last 30 days
6. **Response Formatting**: Structures data to match Twitter API v2 schema

## Design Rationale

### Single Responsibility Functions
Each function has a clear, focused purpose:
- `generateUserProfile()`: User data creation
- `generateTweetContent()`: AI content generation
- `generateFallbackTweets()`: Template-based fallback
- `extractEntities()`: Hashtag and URL parsing
- `getRandomEngagement()`: Metrics simulation
- `getRandomTimestamp()`: Temporal distribution

### Error Handling & Resilience
- Graceful fallback when OpenAI API is unavailable
- Input validation and sanitization
- Comprehensive error logging
- User-friendly error messages

### Maintainability
- Extensive JSDoc documentation
- TypeScript for type safety
- Clean code principles (DRY, KISS)
- Descriptive naming conventions

### Frontend Integration
- Maintains Twitter API v2 response format
- No frontend changes required
- Existing sorting and filtering work seamlessly

# 🤔 Learned

- Integration of **AI/ML services** (OpenAI API) with full-stack applications
- Implementation of **fallback patterns** for external service dependencies
- Design of **realistic data simulation** for social media content
- Maintenance of **API compatibility** when replacing external services
- **Clean code architecture** with single-responsibility functions and comprehensive documentation
- **TypeScript best practices** for type-safe API development
- **Error handling strategies** for production-ready applications

# 📷 Screenshot

<img width="1000" alt="스크린샷 2022-02-02 오전 2 37 36" src="https://user-images.githubusercontent.com/58925260/152306473-e25d036c-628c-4cda-a4b0-6f52a3c748b1.png">
<img width="1000" alt="스크린샷_2022-02-02_오전_2 37 55" src="https://github.com/mandu5/twitproview/assets/58925260/9f2be9b1-af4f-420d-9145-4a2b44638b38">
<img width="1000" alt="스크린샷_2022-02-02_오전_2 37 43" src="https://github.com/mandu5/twitproview/assets/58925260/5071f906-7e60-4035-9331-d4efe7f393bf">
