package com.example.shop.controller;

import com.example.shop.domain.Product;
import com.example.shop.domain.User;
import com.example.shop.repository.ProductRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    @Value("${upload.path}")
    private String uploadPath;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping
    public Product createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("image") MultipartFile image,
            HttpSession session) throws IOException {
        User user = (User) session.getAttribute("user");
        
        if (user == null) {
            return alert("로그인이 필요합니다.");
        }
        File uploadDir = new File(uploadPath).getAbsoluteFile();
        if (!uploadDir.exists()) uploadDir.mkdirs();

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        File dest = new File(uploadDir, fileName);
        image.transferTo(dest);

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setImagePath("/images/" + fileName);
        product.setUser(user);

        return productRepository.save(product);
    }

    private Product alert(String message) {
        throw new RuntimeException(message);
    }


	// 전체 상품 목록 조회
    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
    }


    //상품 수정
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam(value="name", required = false) String name,
            @RequestParam(value="price", required = false) int price,
            @RequestParam(value="image", required = false) MultipartFile image) throws IOException {

        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) return null;

        Product product = optional.get();
        product.setName(name);
        product.setPrice(price);
        
        if (image != null && !image.isEmpty()) {
            if (product.getImagePath() != null) {
                File oldFile = new File(new File(uploadPath), product.getImagePath().replace("/images/", ""));
                if (oldFile.exists()) oldFile.delete();
            }

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File dest = new File(new File(uploadPath).getAbsoluteFile(), fileName);
            image.transferTo(dest);
            product.setImagePath("/images/" + fileName);
        }

        return productRepository.save(product);
    }

    //상품 삭제
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) return;

        Product product = optional.get();

        if (product.getImagePath() != null) {
            File imageFile = new File(new File(uploadPath), product.getImagePath().replace("/images/", ""));
            if (imageFile.exists()) imageFile.delete();
        }

        productRepository.deleteById(id);
    }
}

