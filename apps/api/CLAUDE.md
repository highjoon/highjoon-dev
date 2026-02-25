# apps/api - Express REST API Server

## 실행

```bash
pnpm dev:api    # tsx watch + pino-pretty (개발)
pnpm build      # tsup 빌드
pnpm start      # 프로덕션 실행
```

## API Routes

Base URL에서 마운트: `app.use('/post', postRoutes)` 등

### POST `/post`

| Method | Path              | Auth | 설명                                    |
| ------ | ----------------- | ---- | --------------------------------------- |
| GET    | `/`               | -    | 전체 게시물 목록 (쿼리 파라미터 필터링) |
| GET    | `/featured`       | -    | 추천 게시물                             |
| GET    | `/:slug`          | -    | 슬러그로 게시물 조회                    |
| POST   | `/`               | O    | 게시물 생성                             |
| POST   | `/many`           | O    | 다수 게시물 일괄 생성                   |
| PUT    | `/:slug/view`     | -    | 조회수 증가                             |
| PUT    | `/:id`            | O    | 게시물 수정                             |
| POST   | `/:postId/like`   | O    | 좋아요                                  |
| POST   | `/:postId/unlike` | O    | 좋아요 취소                             |

### COMMENT `/comment`

| Method | Path                 | Auth       | 설명               |
| ------ | -------------------- | ---------- | ------------------ |
| POST   | `/`                  | O          | 댓글 작성          |
| GET    | `/:postId`           | -          | 게시물별 댓글 조회 |
| PUT    | `/:commentId`        | O + 작성자 | 댓글 수정          |
| DELETE | `/:commentId`        | O + 작성자 | 댓글 삭제          |
| POST   | `/reply`             | O          | 대댓글 작성        |
| GET    | `/replies/:parentId` | -          | 대댓글 조회        |
| PUT    | `/reply/:commentId`  | O + 작성자 | 대댓글 수정        |
| DELETE | `/reply/:commentId`  | O + 작성자 | 대댓글 삭제        |

### AUTH `/auth`

| Method | Path               | 설명              |
| ------ | ------------------ | ----------------- |
| GET    | `/github`          | GitHub OAuth 시작 |
| GET    | `/github/callback` | GitHub OAuth 콜백 |

### TAG `/tag`

| Method | Path         | Auth | 설명          |
| ------ | ------------ | ---- | ------------- |
| GET    | `/`          | -    | 전체 태그     |
| GET    | `/:id`       | -    | 태그 상세     |
| GET    | `/:id/posts` | -    | 태그별 게시물 |
| POST   | `/`          | O    | 태그 생성     |
| PUT    | `/:id`       | O    | 태그 수정     |
| DELETE | `/:id`       | O    | 태그 삭제     |

### USER `/user`

| Method | Path                   | Auth | 설명               |
| ------ | ---------------------- | ---- | ------------------ |
| GET    | `/:userId/liked-posts` | O    | 유저 좋아요 게시물 |

## Architecture

```
src/
├── index.ts            엔트리포인트 (서버 시작)
├── server.ts           Express 앱 설정 (미들웨어, 라우트 마운트)
├── routes/             라우트 정의 (경로 + 미들웨어 체인)
├── controllers/        요청 핸들러 (req/res 처리)
├── services/           비즈니스 로직 (Prisma 쿼리)
│   ├── auth/
│   ├── comment/
│   ├── post/
│   ├── tag/
│   └── user/
├── schemas/            Zod 요청 검증 스키마
├── models/             응답 모델 정의
├── middlewares/
│   ├── authenticate.ts     JWT 인증
│   ├── errorHandler.ts     글로벌 에러 핸들러
│   ├── rateLimiter.ts      Rate limiting
│   ├── requestLogger.ts    Pino HTTP 로깅
│   ├── validateRequest.ts  Zod 스키마 검증
│   └── verifyCommentAuthor.ts  댓글 작성자 확인
├── utils/
│   ├── env.ts              환경변수 (envalid)
│   ├── jwt.ts              JWT 유틸
│   ├── corsOptions.ts      CORS 설정
│   ├── httpHandlers.ts     HTTP 응답 헬퍼
│   ├── extractIp.ts        IP 추출
│   └── calculateCommentDepth(s).ts  댓글 깊이 계산
└── types/              auth, logger 타입
```

## Key Patterns

- **요청 검증**: Zod 스키마 → `validateRequest` 미들웨어
- **인증**: JWT (authenticate 미들웨어), 작성자 확인 (verifyCommentAuthor)
- **에러 처리**: 글로벌 errorHandler 미들웨어
- **로깅**: Pino + pino-http
- **보안**: Helmet, CORS, express-rate-limit
- **빌드**: tsup (SWC 기반)
