package com.example.member_crud.repository;

import com.example.member_crud.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

// DB 접근을 위한 인터페이스
// Spring Data JPA가 제공하는 기본 CRUD 기능을 자동으로 상속받음
// 엔티티 클래스 (대상 테이블)의 Member의 PK(Primary Key)의 타입 (@Id 필드 타입)
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 기본 CRUD는 JpaRepository가 이미 제공함
}

