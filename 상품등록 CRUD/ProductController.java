package com.example.product.controller;

import com.example.product.domain.Product;
import com.example.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * ProductController는 상품과 관련된 HTTP 요청을 처리하는 컨트롤러입니다.
 * - 상품 등록 (이미지 업로드 포함)
 * - 상품 목록 조회
 * - 상품 상세 조회
 * - 상품 수정
 * - 상품 삭제
 *
 * 이 컨트롤러는 Service 계층 없이 Repository를 직접 호출하여 처리합니다.
 */
@RestController // 이 클래스가 REST API용 컨트롤러임을 선언 (모든 메서드는 JSON 또는 HTTP 응답 반환)
@RequestMapping("/api/products") // 공통 URL 경로 설정: 예를 들어 "/products/1" 같은 요청을 처리 정적페이지와 구분하기 위해서 api라고 씀
public class ProductController {

    private final ProductRepository productRepository;

    // application.properties에서 설정한 업로드 경로를 주입
    // 예: upload.path=uploads
    @Value("${upload.path}")
    private String uploadPath;

    // 생성자 주입 방식으로 Repository 객체를 받아옴
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * ✅ 상품 등록 기능
     * - 사용자가 이름, 설명, 가격, 이미지 파일을 보내면 상품을 저장하고 이미지도 서버에 저장
     * - 이미지 파일명은 UUID를 이용해 중복을 피함
     * - 저장된 상품 정보를 JSON 형태로 응답
     *
     * @param name 상품명
     * @param description 상품 설명
     * @param price 상품 가격
     * @param image 업로드된 이미지 파일 (form-data 방식)
     */
    @PostMapping // POST 요청을 처리 (상품 등록 시 사용)
    public ResponseEntity<Product> createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestParam("image") MultipartFile image) throws IOException {

        // 이미지 저장 폴더가 없으면 생성
        File uploadDir = new File(uploadPath).getAbsoluteFile();
        if (!uploadDir.exists()) uploadDir.mkdirs();

        // 고유한 파일명을 생성하여 저장 (중복 방지)
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        File dest = new File(uploadDir, fileName);
        image.transferTo(dest); // 실제 파일을 서버에 저장

        // 상품 정보 객체 생성 및 세팅
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImagePath("/images/" + fileName); // 프론트엔드에서 접근할 이미지 경로

        // DB에 상품 정보 저장 후, 저장된 객체 반환
        return ResponseEntity.ok(productRepository.save(product));
    }

    /**
     * ✅ 상품 전체 목록 조회
     * - DB에 저장된 모든 상품 리스트를 조회
     * - JSON 배열 형태로 반환
     */
    @GetMapping // GET 요청을 처리 (목록 조회)
    public List<Product> list() {
        return productRepository.findAll(); // 전체 상품 조회
    }

    /**
     * ✅ 상품 상세 조회
     * - 상품 ID를 통해 특정 상품을 조회
     * - 상품이 존재하면 JSON으로 응답, 없으면 404 오류 반환
     *
     * @param id 조회할 상품 ID
     */
    @GetMapping("/{id}") // URL 경로의 {id} 값을 받아 상세 조회
    //ResponseEntity는 Spring Web의 핵심클래스로 응답 본문(body), HTTP 상태 코드 (예: 200, 404), 응답 헤더 (필요시)
    // 까지 모두 포함해서 반환할 수 있는 구조
    public ResponseEntity<Product> get(@PathVariable Long id) {  
        return productRepository.findById(id)
                .map(ResponseEntity::ok) // 존재할 경우 200 OK와 상품 정보 반환
                .orElse(ResponseEntity.notFound().build()); // 없으면 404 NOT FOUND 반환
    }

    /**
     * ✅ 상품 수정 기능
     * - 기존 상품을 ID로 찾고, 이름/설명/가격을 수정
     * - 이미지가 새로 업로드되면 기존 이미지를 삭제하고 교체
     *
     * @param id 수정할 상품 ID
     * @param name 수정할 이름
     * @param description 수정할 설명
     * @param price 수정할 가격
     * @param image (선택) 새 이미지 파일
     */
    @PutMapping("/{id}") // PUT 요청 처리 (전체 정보 수정)
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        // 기존 상품을 조회
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Product product = optional.get();

        // 기본 정보 업데이트
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);

        // 이미지가 새로 업로드되었을 경우 처리
        if (image != null && !image.isEmpty()) {
            // 기존 이미지 삭제
            if (product.getImagePath() != null) {
                File oldFile = new File(new File(uploadPath), product.getImagePath().replace("/images/", ""));
                if (oldFile.exists()) oldFile.delete();
            }

            // 새 이미지 저장
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File dest = new File(new File(uploadPath).getAbsoluteFile(), fileName);
            image.transferTo(dest);
            product.setImagePath("/images/" + fileName);
        }

        return ResponseEntity.ok(productRepository.save(product)); // 수정된 상품 저장 후 반환
    }

    /**
     * ✅ 상품 삭제 기능
     * - 상품 ID를 통해 DB에서 삭제
     * - 이미지도 함께 삭제
     *
     * @param id 삭제할 상품 ID
     */
    @DeleteMapping("/{id}") // DELETE 요청 처리
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Product product = optional.get();

        // 이미지 파일이 존재할 경우 삭제
        if (product.getImagePath() != null) {
            File imageFile = new File(new File(uploadPath), product.getImagePath().replace("/images/", ""));
            if (imageFile.exists()) imageFile.delete();
        }

        productRepository.deleteById(id); // DB에서 상품 삭제
        return ResponseEntity.noContent().build(); // 204 No Content 응답 (성공, 본문 없음)
    }
}
