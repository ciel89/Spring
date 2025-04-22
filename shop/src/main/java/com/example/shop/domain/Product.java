package com.example.shop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private int price;
	private String imagePath;
	
	@ManyToOne
	//순환참조 방지
	@JsonIgnoreProperties({"products"})
	private User user;
}
