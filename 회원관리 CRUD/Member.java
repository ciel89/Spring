package com.example.member_crud.entity;

import jakarta.persistence.*;
import lombok.*;

// 엔티티 클래스 (DB 테이블과 매핑)
@Entity
@Getter @Setter // 롬복이 자동 생성
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 가진 생성자 자동 생성
public class Member {

    @Id // 기본키(PK)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    private String name;     // 회원 이름
    private String email;    // 회원 이메일
    private String password; // 회원 비밀번호
}
