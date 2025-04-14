package com.example.product.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.io.File;

// ✅ 이 클래스는 스프링 웹 설정을 담당하는 구성 클래스임을 나타냄
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // ✅ application.properties 또는 application.yml에서 정의된 업로드 경로를 주입받음
    // 예: upload.path=C:/upload 또는 /home/ec2-user/upload
    @Value("${upload.path}")
    private String uploadPath;

    // ✅ 정적 자원(이미지 등)을 브라우저에서 접근할 수 있도록 매핑 설정
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ 파일 객체로 변환하여 절대 경로 추출 (OS에 따라 경로 구분자 자동 처리)
        String absolutePath = new File(uploadPath).getAbsolutePath() + File.separator;

        // ✅ 예: http://localhost:8080/images/파일명 → 실제 서버의 upload 폴더에서 찾도록 설정
        registry.addResourceHandler("/images/**") // 클라이언트 요청 URL 패턴
                .addResourceLocations("file:" + absolutePath); // 실제 로컬 경로
    }

    // ✅ CORS(Cross-Origin Resource Sharing) 설정
    // React 개발 서버(포트 3000번)에서 API 요청이 가능하도록 허용
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 허용
                .allowedOrigins("http://localhost:3000") // React 앱이 실행되는 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 요청 헤더 허용
                .allowCredentials(false); // 쿠키, 인증정보 포함 여부 (true로 하면 보안 강화 필요)
    }
}
