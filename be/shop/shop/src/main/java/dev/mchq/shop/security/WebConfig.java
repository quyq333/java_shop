//package dev.mchq.shop.security;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**") // Áp dụng cho tất cả các endpoint
//                .allowedOrigins("*") // Chỉ cho phép từ frontend
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các HTTP method cho phép
//                .allowedHeaders("*") // Chấp nhận mọi header
//                .allowCredentials(true); // Cho phép gửi thông tin xác thực (cookies, auth headers)
//    }
//}
