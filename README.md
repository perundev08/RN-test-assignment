# Upwork has blocked my account for unknown reasons. If you can, please contact me at perunoleh08@gmail.com.

## Setup

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3000`

### Mobile App
```bash
cd mobile
npm install
npm start
```
Then press `i` for iOS or `a` for Android emulator.

**Note:** API URL automatically handles platforms (localhost for iOS, 10.0.2.2 for Android emulator). For physical devices, update `API_BASE_URL` in `mobile/src/constants/index.ts` to your computer's local IP.

## API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts/:postId/flag` - Flag a post (body: `{ userId: string, reason: FlagReason }`)
- `GET /api/posts/:postId/flags` - Get flags for a post
- `GET /health` - Health check

Flag reasons: `Spam`, `Inappropriate`, `Harassment`, `Misinformation`, `Other`

## Answers

### 1. What did you build in the time allowed?

**Mobile App (React Native + Expo):**
- Posts list with flagging functionality
- Custom modal for flag reason selection
- Pull-to-refresh, loading states, error handling
- Component-based architecture with TypeScript
- Optimized performance (memoization, FlatList windowing)

**Backend (Node.js + TypeScript + Express):**
- RESTful API with route/service/middleware separation
- POST endpoint validates inputs and prevents duplicate flags (409 Conflict)
- Error handling middleware, request logging
- In-memory storage (simulating database)

**Integration:** Full connection between mobile app and backend with proper error handling.

### 2. What would you build next with more time?

1. **Authentication** - JWT/OAuth, real user IDs
2. **Database** - Replace in-memory with PostgreSQL/MongoDB, migrations
3. **Flag moderation** - Dashboard, aggregation thresholds, withdraw capability
4. **Testing** - Unit, integration, E2E tests
5. **Monitoring** - Sentry, structured logging (Winston/Pino), APM (Datadog/New Relic)
6. **Security** - Rate limiting, input sanitization, production CORS
7. **Scalability** - Redis caching, message queues, database indexing
8. **UX enhancements** - Skeleton loaders, dark mode, offline support

### 3. How would this feature connect to the rest of a real app?

- **User Service** - Authentication, profiles, permissions
- **Post Service** - Real content from CMS
- **Moderation Service** - Review workflows, AI/ML content moderation
- **Notification Service** - Alert moderators on flags, notify users on review
- **Analytics Service** - Track flagging patterns, community health
- **Admin Dashboard** - Review and act on flagged content
- **Audit Log** - Compliance tracking

Would be part of larger REST/GraphQL API with shared middleware (auth, rate limiting, logging).

### 4. What potential issues do you see with scaling or users?

**Scalability:**
- In-memory storage doesn't persist or scale horizontally → Use database
- No rate limiting → Add express-rate-limit or Redis-based limiting
- No caching → Add Redis for frequently accessed posts
- Race conditions on concurrent flags → Database unique constraints, transactions
- Single server bottleneck → Load balancer, stateless design, shared DB

**User Experience:**
- No offline support → Queue actions, sync when online
- No flag status visibility → Show if already flagged, disable button
- Generic errors → User-friendly, localized messages
- No moderation feedback → Status updates, transparency system

### 5. How would you monitor or track errors in production?

1. **Error Tracking** - Sentry/Rollbar for JS and server errors, alerting
2. **APM** - New Relic/Datadog for response times, query performance
3. **Logging** - Winston/Pino structured JSON logs, request IDs, centralized storage (ELK/CloudWatch)
4. **Health Checks** - `/health` endpoint, uptime monitoring (Pingdom)
5. **Metrics** - Prometheus + Grafana for flagging rates, latency, business metrics
6. **Database Monitoring** - Query performance, connection pools, slow query logs
7. **User Analytics** - Action tracking, funnel analysis, crash reports
8. **Alerting** - High error rates, latency spikes, DB issues → PagerDuty
