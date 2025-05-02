package com.example.product.cofing;

import java.io.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")  //모든 경로 허용
				.allowedOrigins("http://43.202.36.99")
				.allowedMethods("GET","POST","PUT","DELETE")
				.allowCredentials(false);   //쿠키 인증
	}
	
	//이미지 업로드
	@Value("${upload.path}")
	private String uploadPath;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//파일 객체로 변환해서 절대 경로 추출
		// ✅ 파일 객체로 변환하여 절대 경로 추출 (OS에 따라 경로 구분자 자동 처리)
        String absolutePath = new File(uploadPath).getAbsolutePath() + File.separator;

        // ✅ 예: http://localhost:8080/images/파일명 → 실제 서버의 upload 폴더에서 찾도록 설정
        registry.addResourceHandler("/images/**") // 클라이언트 요청 URL 패턴
                .addResourceLocations("file:" + absolutePath); // 실제 로컬 경로
	}
	
}























