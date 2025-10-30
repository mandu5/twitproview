# Quick Start Guide

Get the AI X Post Simulator running in 5 minutes!

## Instant Setup (Fallback Mode - No API Key Required)

```bash
# 1. Install dependencies
npm install
cd frontend && npm install && cd ..

# 2. Start the backend server
node app.tsx &

# 3. In a new terminal, start the frontend
cd frontend && npm run dev
```

That's it! Open http://localhost:5173 and start generating posts.

## With AI Mode (Optional)

```bash
# 1. Create .env file
cp .env.example .env

# 2. Add your OpenAI API key to .env
echo "OPENAI_API_KEY=sk-your-key-here" >> .env

# 3. Restart the backend
# The app will now use AI to generate contextual tweets
```

## Usage Examples

### Example 1: Generate Posts for a Developer
```
Username: tech_enthusiast
Result: 15 tech-themed posts with hashtags like #coding #developer
```

### Example 2: Generate Posts for a Creative
```
Username: artsy_jane
Result: 15 creative posts with varied content and emojis
```

### Example 3: Test Sorting
```
1. Enter any username
2. Wait for posts to load
3. Use dropdown to sort by:
   - Date (newest first)
   - Likes (most popular)
   - Retweets (most shared)
```

## API Testing

Test the backend directly:

```bash
# Health check
curl http://localhost:3000/api/

# Generate tweets
curl "http://localhost:3000/api/timeline?screen_name=testuser"
```

## Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -ti:3000

# Kill the process if needed
kill -9 $(lsof -ti:3000)
```

### Frontend shows "API error"
```bash
# Make sure backend is running
ps aux | grep node

# Check backend logs
# Should see: "🚀 @ server is running at: 3000"
```

### No posts generated
```bash
# Check browser console (F12)
# Check network tab for failed requests
# Verify backend URL in frontend config
```

## Environment Variables

### Required
- None! Works out of the box

### Optional
- `OPENAI_API_KEY` - For AI-generated content (GPT-3.5)
- `PORT` - Backend port (default: 3000)

### Not Needed for Core Functionality
- `TWITTER_*` - Only needed for Trends feature

## Production Deployment

### Option 1: Build and Deploy
```bash
# Build frontend
cd frontend && npm run build && cd ..
mv frontend/dist ./build

# Start production server
npm start
```

### Option 2: Heroku
```bash
# Procfile already included!
git push heroku main
```

### Option 3: DigitalOcean App Platform
```bash
# Use these settings:
# Build Command: npm run build:frontend
# Run Command: npm start
# Environment: Node 16+
```

### Option 4: Docker
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd frontend && npm install && npm run build && cd ..
RUN mv frontend/dist ./build
EXPOSE 3000
CMD ["npm", "start"]
```

## Feature Showcase

### 1. Realistic User Profiles
- Auto-generated avatars (DiceBear API)
- Capitalized display names
- Consistent usernames

### 2. Varied Content
- **Fallback Mode**: 20+ curated templates
- **AI Mode**: Contextual, username-specific content
- Emojis and hashtags included
- Natural language flow

### 3. Engagement Metrics
- Likes: 0-1,000 range
- Retweets: 0-500 range
- Realistic distributions
- Sortable by any metric

### 4. Smart Sorting
- **By Date**: Chronological (newest first)
- **By Likes**: Most popular posts
- **By Retweets**: Most shared content
- Instant client-side sorting

### 5. Polish & UX
- Dark theme (X/Twitter style)
- Responsive design
- Loading states
- Error handling
- Clear disclaimers

## Demo Scenarios

### Scenario 1: Product Demo
```
1. Open app
2. Enter "demo_user"
3. Show generated posts
4. Demonstrate sorting
5. Click profile/hashtags to show interactivity
6. Explain AI vs fallback modes
```

### Scenario 2: Technical Interview
```
Points to discuss:
- API design (Twitter v2 compatible)
- Error handling (graceful fallbacks)
- TypeScript type safety
- Clean code principles
- Single-responsibility functions
- Documentation quality
- Testing approach
```

### Scenario 3: User Testing
```
Tasks:
1. Generate posts for different usernames
2. Test all sort options
3. Click various links
4. Try edge cases (empty, special chars)
5. Check mobile responsiveness
```

## Next Steps

1. ✅ **Try It Out**: Generate some posts!
2. ✅ **Read README.md**: Understand the architecture
3. ✅ **Check TESTING_GUIDE.md**: Comprehensive testing
4. ✅ **Review Code**: See clean code principles in action
5. ✅ **Deploy**: Ship it to production!

## Support

- 📖 Full docs: See README.md
- 🧪 Testing: See TESTING_GUIDE.md
- 📋 Implementation: See IMPLEMENTATION_SUMMARY.md
- 💬 Questions: Check code comments (JSDoc)

---

**Enjoy generating realistic X/Twitter posts with AI! 🚀**
