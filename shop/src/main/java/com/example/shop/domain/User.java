package com.example.shop.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String email;
	private String name;
	private String password;  //암호화
	
	//사용자작 등록한 상품목록 매핑
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Product> products;
}
