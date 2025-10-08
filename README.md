# Shoot Doori Web

축구 매칭 플랫폼 웹 애플리케이션

## 🚀 배포

### Vercel 배포

1. **Vercel 계정 연결**
   - [Vercel](https://vercel.com)에 로그인
   - GitHub 저장소 연결

2. **환경 변수 설정**

   ```
   VITE_API_BASE_URL=https://your-backend-api.com
   VITE_ENVIRONMENT=production
   ```

3. **자동 배포**
   - `main` 브랜치에 푸시 시 자동 배포
   - Pull Request 생성 시 프리뷰 배포

## 🛠️ 개발

### 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린팅
npm run lint

# 포맷팅
npm run format
```

### 환경 변수

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_ENVIRONMENT=development
```

## 📁 프로젝트 구조

```
src/
├── api/           # API 호출 함수
├── components/    # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── contexts/      # React Context
├── types/         # TypeScript 타입 정의
├── utils/         # 유틸리티 함수
├── theme/         # 테마 설정
└── constants/     # 상수 정의
```

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 커버리지
npm run test:coverage
```

## 📝 주요 기능

- 🔐 사용자 인증 (로그인/회원가입)
- ⚽ 팀 생성 및 관리
- 🏆 매치 신청 및 관리
- 👥 팀원 관리
- 📊 프로필 관리

## 🔧 기술 스택

- **Frontend**: React, TypeScript, Vite
- **Styling**: Styled Components, Emotion
- **State Management**: React Query, Context API
- **Testing**: Jest, React Testing Library, MSW
- **Deployment**: Vercel
