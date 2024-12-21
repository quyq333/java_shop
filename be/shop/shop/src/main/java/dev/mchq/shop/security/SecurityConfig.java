//package dev.mchq.shop.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.cors() // Bật CORS
//                .and()
//                .csrf().disable() // Nếu không cần CSRF, có thể tắt
//                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Cho phép tất cả yêu cầu
//        return http.build();
//    }
//}
//
