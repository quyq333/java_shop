//package dev.mchq.shop;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//    @Autowired
//    private AuthService authService;
//    @PostMapping("/register")
//    public String register(@RequestParam String email, @RequestParam String password){
//        return authService.register(email, password);
//    }
//    @PostMapping("/login")
//    public String login(@RequestParam String email, @RequestParam String password){
//        return authService.login(email, password);
//    }
//}
