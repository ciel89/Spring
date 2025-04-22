package com.example.shop.controller;

import com.example.shop.domain.User;
import com.example.shop.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // 암호화
        userRepository.save(user);
        return "회원가입 완료";
    }

    // 로그인
    @PostMapping("/login")
    public User login(@RequestBody User requestUser, HttpSession session) {
        User user = userRepository.findByEmail(requestUser.getEmail());
        if (user != null && passwordEncoder.matches(requestUser.getPassword(), user.getPassword())) {
            session.setAttribute("user", user);
            return user; 
        }
        return null; // 예외 처리
    }

    // 세션 로그인 상태 확인
    @GetMapping("/check")
    public User checkSession(HttpSession session) {
        return (User) session.getAttribute("user");
    }
    
    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "로그아웃 완료";
    }


}
