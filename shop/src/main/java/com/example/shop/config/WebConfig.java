package com.example.shop.config;

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
				.allowedOrigins("http://localhost:3000")
				.allowedMethods("GET","POST","PUT","DELETE")
				.allowCredentials(true);   
		}
	
	//이미지 업로드
	@Value("${upload.path}")
	private String uploadPath;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//파일 객체로 변환해서 절대 경로 추출
		String absolutePath = new File(uploadPath).getAbsolutePath() + File.separator;
		registry.addResourceHandler("/images/**")
				.addResourceLocations("file:" + absolutePath);
	}
	
}
