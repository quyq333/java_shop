//package dev.mchq.shop.util;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//import java.util.Date;
//
//
//public class JwtUtil {
//    private static final String SECRET_KEY = "secret"; // Đổi thành key bảo mật mạnh hơn
//
//    public static String generateToken(String email) {
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//}
