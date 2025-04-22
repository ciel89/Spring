package com.example.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.shop.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
	//로그인시 
	User findByEmail(String email);
}
