# Testing Guide - AI X Post Simulator

This guide provides comprehensive testing instructions for the AI-powered X/Twitter post simulator.

## Prerequisites

Before testing, ensure you have:
1. Node.js (v16+) installed
2. All dependencies installed (`npm install` in root and frontend directories)
3. `.env` file created (optional - application works without OpenAI API key)

## Testing Modes

### Mode 1: Fallback Mode (No OpenAI API Key)

**Purpose**: Test template-based tweet generation without external API dependencies

**Setup**:
```bash
# Don't set OPENAI_API_KEY in .env, or comment it out
# OPENAI_API_KEY=
```

**Expected Behavior**:
- Application generates 15 tweets using predefined templates
- Posts include varied content with emojis and hashtags
- All engagement metrics are randomly generated
- User profiles are created with DiceBear avatars
- Sorting by date, likes, and retweets works correctly

**Test Cases**:
1. Enter username `testuser123` → Should generate 15 diverse posts
2. Enter username `john.doe` → Should capitalize to "John Doe"
3. Enter username `tech_enthusiast` → Should capitalize to "Tech Enthusiast"
4. Test sorting:
   - Sort by Date → Most recent posts appear first
   - Sort by Likes → Posts with most likes appear first
   - Sort by Retweets → Posts with most retweets appear first

### Mode 2: AI Mode (With OpenAI API Key)

**Purpose**: Test AI-generated contextual tweet content

**Setup**:
```bash
# Set OPENAI_API_KEY in .env
OPENAI_API_KEY=sk-...your-api-key...
```

**Expected Behavior**:
- Application calls OpenAI GPT-3.5 to generate contextual tweets
- Posts are more varied and username-specific
- Falls back to template mode if API call fails
- All other features work identically to fallback mode

**Test Cases**:
1. Enter username `musician_mike` → Should generate music-themed posts
2. Enter username `foodie_lover` → Should generate food-related posts
3. Enter username `tech_guru` → Should generate tech-focused posts
4. Monitor console for OpenAI API calls and responses
5. Test error handling by temporarily using invalid API key

## Feature Testing

### 1. User Profile Generation

**Test Cases**:
| Input Username | Expected Display Name | Profile Image |
|----------------|----------------------|---------------|
| `johndoe` | John Doe | DiceBear avatar with seed `johndoe` |
| `jane_smith` | Jane Smith | DiceBear avatar with seed `jane_smith` |
| `tech.writer` | Tech Writer | DiceBear avatar with seed `tech.writer` |
| `@sarah_jones` | Sarah Jones | @ symbol stripped |

**Verification**:
- [ ] Display name properly capitalized
- [ ] Username displayed as `@{username}`
- [ ] Profile image loads correctly
- [ ] Profile link goes to `https://twitter.com/{username}`

### 2. Post Content

**Test Cases**:
- [ ] Post text displays correctly (10-280 characters)
- [ ] Hashtags are clickable and link to Twitter hashtag pages
- [ ] URLs (if present) are displayed and clickable
- [ ] Emojis render properly
- [ ] Line breaks are preserved

### 3. Engagement Metrics

**Verify**:
- [ ] Like count: 0-1000 range, displayed with heart icon
- [ ] Retweet count: 0-500 range, displayed with retweet icon
- [ ] Reply count: 0-100 range (in data structure)
- [ ] Quote count: 0-50 range (in data structure)
- [ ] Metrics are randomized per post
- [ ] Metrics are consistent after sorting

### 4. Timestamps

**Verify**:
- [ ] Timestamps span last 30 days
- [ ] Displayed in human-readable format (via Moment.js)
- [ ] Format: e.g., "Wed, Dec 25, 2024 3:45 PM"
- [ ] Sorting by date orders posts correctly

### 5. Sorting Functionality

**Test Procedure**:
1. Generate posts for any username
2. Default sort is "Date" (newest first)
3. Switch to "Likes" → Verify posts reorder correctly
4. Switch to "Retweets" → Verify posts reorder correctly
5. Switch back to "Date" → Verify original order restored

**Expected Results**:
- [ ] Sort dropdown visible after posts load
- [ ] Sorting is instant (no API call needed)
- [ ] Post order changes visually
- [ ] No posts are lost or duplicated during sorting

### 6. Error Handling

**Test Cases**:

1. **Empty username**:
   - Leave input blank, click Search
   - Expected: Placeholder text "Enter any username to generate realistic X/Twitter posts with AI."

2. **Special characters**:
   - Enter `user@#$%^` → Should handle gracefully
   - Enter `user!@#` → Should sanitize input

3. **Very long username**:
   - Enter 100+ character username → Should handle without breaking UI

4. **Network errors (simulation)**:
   - With OpenAI API key, disconnect network temporarily
   - Expected: Falls back to template mode with console warning

### 7. UI/UX Testing

**Visual Tests**:
- [ ] Dark theme renders correctly (#1a202c background)
- [ ] Post cards have proper spacing and shadows
- [ ] Text is readable (white on dark background)
- [ ] Icons (heart, retweet) are visible and styled
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Navbar displays "AI X Post Simulator"
- [ ] Footer displays "AI-Generated Content • Not Real Tweets"

**Interaction Tests**:
- [ ] Input box accepts typing
- [ ] Search button is clickable
- [ ] Sorting dropdown is accessible
- [ ] Profile images are clickable
- [ ] External links open in new tab
- [ ] Smooth scrolling for long post lists

### 8. Performance Testing

**Metrics to Monitor**:
- [ ] Initial page load time: < 2 seconds
- [ ] Post generation time: < 3 seconds (fallback mode)
- [ ] Post generation time: < 5 seconds (AI mode)
- [ ] Sorting operation: < 100ms
- [ ] Memory usage: Stable with no leaks
- [ ] Multiple searches: No degradation

### 9. API Endpoint Testing

**Backend API Tests** (can use Postman, curl, or browser):

1. **Health Check**:
```bash
curl http://localhost:3000/api/
# Expected: {"message":"API working - AI Tweet Simulator v1.0"}
```

2. **Timeline Generation**:
```bash
curl "http://localhost:3000/api/timeline?screen_name=testuser"
# Expected: JSON with data, includes, and meta fields
```

3. **Missing Username**:
```bash
curl "http://localhost:3000/api/timeline"
# Expected: 400 error with message "screen_name is required"
```

4. **Username Sanitization**:
```bash
curl "http://localhost:3000/api/timeline?screen_name=@testuser"
# Expected: @ symbol stripped, normal response
```

### 10. Data Structure Validation

**Verify Response Schema** (matches Twitter API v2):

```typescript
{
  data: Array<{
    id: string,
    text: string,
    created_at: string (ISO format),
    author_id: string,
    public_metrics: {
      retweet_count: number,
      reply_count: number,
      like_count: number,
      quote_count: number
    },
    entities: {
      hashtags: Array<{start, end, tag}>,
      urls: Array<{start, end, url, display_url, expanded_url}>
    }
  }>,
  includes: {
    users: Array<{
      id: string,
      name: string,
      username: string,
      profile_image_url: string
    }>
  },
  meta: {
    result_count: number,
    newest_id: string,
    oldest_id: string
  }
}
```

## Automated Testing Scenarios

### Scenario 1: Basic User Flow
1. Open application
2. Enter username "developer123"
3. Click Search
4. Verify 15 posts appear
5. Change sort to "Likes"
6. Verify order changes
7. Click profile image
8. Verify Twitter link opens

### Scenario 2: Multiple Searches
1. Search for "user1"
2. Verify posts load
3. Search for "user2"
4. Verify old posts cleared, new posts loaded
5. Verify profile changes to user2
6. Search for empty string
7. Verify posts cleared, placeholder shown

### Scenario 3: Edge Cases
1. Enter "@@@special!!!"
2. Verify no crash
3. Enter very long username (200+ chars)
4. Verify truncation or handling
5. Rapidly click Search multiple times
6. Verify no duplicate requests or race conditions

## Browser Compatibility Testing

Test on:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Console Monitoring

**Expected Console Messages**:

**Fallback Mode**:
```
⚠️  Warning: OPENAI_API_KEY is not set. AI tweet generation will use fallback mode.
Generating AI tweets for user: @testuser
OpenAI API error, using fallback: [reason]
```

**AI Mode**:
```
Generating AI tweets for user: @testuser
[OpenAI API response data]
```

**Error Scenarios**:
```
Error generating timeline: [error message]
Failed to fetch timeline: [details]
```

## Regression Testing Checklist

After any code changes, verify:
- [ ] All test cases above still pass
- [ ] No new console errors or warnings
- [ ] Performance metrics haven't degraded
- [ ] UI styling remains consistent
- [ ] Sorting still works correctly
- [ ] Profile generation is consistent
- [ ] API responses match schema

## Troubleshooting Common Issues

### Issue: "No posts generated"
- Check console for errors
- Verify backend is running on port 3000
- Check network tab for failed API calls
- Verify `.env` file is in root directory

### Issue: "API call fails"
- Check if backend server is running
- Verify frontend proxy configuration in `vite.config.ts`
- Check CORS settings if running separately
- Verify OpenAI API key if using AI mode

### Issue: "Sorting doesn't work"
- Check browser console for JavaScript errors
- Verify sort state is updating (React DevTools)
- Ensure `public_metrics` exist on all posts

### Issue: "Profile images don't load"
- Check network tab for DiceBear API calls
- Verify internet connection
- Check Content Security Policy settings

## Success Criteria

The application passes testing if:
- ✅ Posts generate successfully in both fallback and AI modes
- ✅ All sorting options work correctly
- ✅ User profiles display properly
- ✅ Engagement metrics are realistic and varied
- ✅ UI is responsive and visually appealing
- ✅ No console errors (warnings allowed)
- ✅ Performance meets targets
- ✅ Error handling is graceful
- ✅ Browser compatibility is maintained
- ✅ API responses match expected schema

## Reporting Issues

When reporting bugs, include:
1. Test mode (Fallback or AI)
2. Browser and version
3. Username tested
4. Expected behavior
5. Actual behavior
6. Console errors
7. Network tab screenshots
8. Steps to reproduce

## Continuous Improvement

Track metrics over time:
- Post generation time
- User engagement with sorting
- Most common usernames tested
- Error rates by category
- Browser usage patterns
- Performance bottlenecks
