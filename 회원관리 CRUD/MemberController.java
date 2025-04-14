package com.example.member_crud.controller;

import com.example.member_crud.entity.Member;
import com.example.member_crud.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 회원 관련 요청을 처리하는 REST 컨트롤러
 * 이 클래스는 클라이언트로부터 /members 경로로 들어오는 HTTP 요청을 처리합니다.
 */
@RestController  // 이 클래스가 REST API 컨트롤러임을 나타냄. 모든 메서드의 결과는 JSON으로 반환됨.
@RequestMapping("/members")  // 기본 URL 경로를 "/members"로 설정. 예: /members, /members/1 등
public class MemberController {

    // Spring이 자동으로 MemberRepository를 주입해줌 (빈 자동 주입)
    @Autowired 
    private MemberRepository memberRepository;

    /**
     * 회원 등록(Create)
     * HTTP POST /members
     * @param member 요청 본문(JSON)에서 전달받은 회원 정보
     * @return 저장된 회원 객체 (JSON 형식으로 반환됨)
     */
    @PostMapping
    public Member create(@RequestBody Member member) {
        // 요청 본문을 Member 객체로 변환한 후 DB에 저장
        return memberRepository.save(member);
    }

    /**
     * 전체 회원 조회(Read All)
     * HTTP GET /members
     * @return 모든 회원 리스트를 JSON 배열로 반환
     */
    @GetMapping
    public List<Member> readAll() {
        return memberRepository.findAll();
    }

    /**
     * 단일 회원 조회(Read One)
     * HTTP GET /members/{id}
     * @param id URL 경로에서 전달받은 회원의 고유 ID
     * @return 해당 ID의 회원 객체, 없으면 null 반환
     */
    @GetMapping("/{id}")
    public Member read(@PathVariable Long id) {
        // .orElse(null): 해당 ID가 없으면 null 반환
        return memberRepository.findById(id).orElse(null);
    }

    /**
     * 회원 정보 수정(Update)
     * HTTP PUT /members/{id}
     * @param id 수정할 회원의 ID (URL 경로에서 받음)
     * @param member 수정할 회원 정보 (JSON 요청 본문에서 받음)
     * @return 수정된 회원 객체 (JSON으로 반환), 없으면 null
     */
    @PutMapping("/{id}")
    public Member update(@PathVariable Long id, @RequestBody Member member) {
        // 기존 회원 조회
        Member existing = memberRepository.findById(id).orElse(null);

        if (existing != null) {
            // 수정할 필드만 업데이트
            existing.setName(member.getName());
            existing.setEmail(member.getEmail());
            existing.setPassword(member.getPassword());

            // 업데이트 후 저장
            return memberRepository.save(existing);
        }

        // 해당 ID의 회원이 없으면 null 반환
        return null;
    }

    /**
     * 회원 삭제(Delete)
     * HTTP DELETE /members/{id}
     * @param id 삭제할 회원의 ID
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        memberRepository.deleteById(id);
    }
}
