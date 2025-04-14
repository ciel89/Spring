package com.example.member_crud.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * React (localhost:3000) → Spring Boot (localhost:8080) 사이의 CORS 정책을 허용해주는 설정 클래스
 */
@Configuration // 이 클래스가 설정 클래스임을 알려줌
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청 경로 허용
                .allowedOrigins("http://localhost:3000") // React 개발 서버 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowCredentials(false); // 쿠키 인증은 안 함
    }
}
