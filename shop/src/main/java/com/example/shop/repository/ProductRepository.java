package com.example.shop.repository;

import com.example.shop.domain.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<Product, Long>{
	//특정 사용자만 제한
	List<Product> findByUserId(Long userId);
}
