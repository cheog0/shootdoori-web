# CORS 문제 해결 가이드

## 문제 상황

웹에서 API 호출 시 다음과 같은 CORS 에러가 발생합니다:

```
OPTIONS https://app.shootdoori.com/api/auth/login
Status: 403 Forbidden
```

## 원인

웹 브라우저는 보안상의 이유로 다른 도메인으로의 요청을 제한합니다.
`http://localhost:8081`에서 `https://app.shootdoori.com`으로 요청할 때,
브라우저가 먼저 OPTIONS 요청(preflight)을 보내고, 서버가 이를 허용하지 않아 403 에러가 발생합니다.

## 해결 방법

### 1. 서버 측 해결 (필수)

**백엔드 서버에서 다음 CORS 헤더를 설정해야 합니다:**

```javascript
// Express 예시
app.use(
  cors({
    origin: [
      'http://localhost:8081', // 개발 환경
      'http://localhost:3000', // 개발 환경 (다른 포트)
      'https://your-web-domain.com', // 프로덕션 웹 도메인
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);
```

**또는 Spring Boot 예시:**

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:8081",
                        "http://localhost:3000",
                        "https://your-web-domain.com"
                    )
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("Content-Type", "Authorization", "Accept")
                    .allowCredentials(true);
            }
        };
    }
}
```

### 2. 프론트엔드 임시 해결 (개발 환경)

개발 환경에서만 사용할 수 있는 방법:

#### 옵션 A: 브라우저 확장 프로그램 사용

- CORS Unblock 같은 브라우저 확장 프로그램 사용 (개발 전용)

#### 옵션 B: 프록시 서버 사용

- 개발 서버에 프록시 설정 추가 (Expo는 제한적)

### 3. 프로덕션 환경

프로덕션에서는 웹앱과 API가 같은 도메인에 배포되거나,
서버에서 웹앱 도메인을 CORS 허용 목록에 추가해야 합니다.

## 확인 사항

1. ✅ 서버에서 `Access-Control-Allow-Origin` 헤더 설정
2. ✅ 서버에서 `Access-Control-Allow-Methods` 헤더 설정 (OPTIONS 포함)
3. ✅ 서버에서 `Access-Control-Allow-Headers` 헤더 설정
4. ✅ 서버에서 OPTIONS 요청 처리

## 현재 프론트엔드 설정

프론트엔드에서는 이미 다음 설정이 적용되어 있습니다:

- `Content-Type: application/json` 헤더
- `Accept: application/json` 헤더
- `withCredentials: false` (쿠키 미사용)

**중요**: 이 문제는 서버 측에서 해결해야 합니다. 프론트엔드만으로는 완전히 해결할 수 없습니다.
