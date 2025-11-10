# 웹앱 배포 가이드

## 웹앱 빌드 및 배포

### 1. 로컬 개발 서버 실행

```bash
npm run web
```

### 2. 웹앱 빌드

```bash
npm run web:build
```

빌드된 파일은 `web-build/` 디렉토리에 생성됩니다.

### 3. 로컬에서 빌드된 웹앱 테스트

```bash
npm run web:serve
```

### 4. 웹앱 배포

#### 옵션 1: 정적 호스팅 서비스 사용

빌드된 `web-build/` 디렉토리를 다음 서비스에 배포할 수 있습니다:

- **Vercel**: `vercel deploy web-build`
- **Netlify**: `netlify deploy --dir=web-build`
- **GitHub Pages**: `gh-pages -d web-build`
- **Firebase Hosting**: `firebase deploy --only hosting`
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

#### 옵션 2: 자체 서버에 배포

`web-build/` 디렉토리의 모든 파일을 웹 서버의 루트 디렉토리에 업로드합니다.

### 5. PWA 설치

웹앱이 배포되면 사용자는:

1. 브라우저에서 웹앱에 접속
2. 브라우저 메뉴에서 "홈 화면에 추가" 또는 "앱 설치" 선택
3. 홈 화면에 웹앱 아이콘이 생성됨

## 주요 웹 호환성 수정사항

### ✅ 완료된 수정

1. **expo-secure-store → localStorage**: 웹에서 토큰 저장을 위해 localStorage 사용
2. **BackHandler 제거**: 웹에서는 Android 뒤로가기 버튼이 없으므로 제거
3. **expo-symbols 웹 처리**: 웹에서는 MaterialIcons 사용
4. **PWA 설정**: manifest, theme color, display mode 등 설정 완료

## 환경 변수 설정

웹 배포 시 환경 변수를 설정해야 합니다:

```bash
EXPO_PUBLIC_API_BASE_URL=https://app.shootdoori.com
EXPO_PUBLIC_ENVIRONMENT=production
```

## 주의사항

1. **HTTPS 필수**: PWA는 HTTPS 환경에서만 작동합니다 (localhost 제외)
2. **서비스 워커**: Expo가 자동으로 생성하지만, 필요시 커스터마이징 가능
3. **캐싱**: 웹앱은 오프라인에서도 작동할 수 있도록 캐싱됩니다
