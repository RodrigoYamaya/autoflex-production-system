package com.projedata.backend.controller;

import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<ProductResponsetDto> saveProduct(@RequestBody @Valid ProductRequestDto productRequestDto) {
        ProductResponsetDto saveProduct =  productService.save(productRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponsetDto>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") long id) {
        productService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("product com o ID " + id + " deletado com sucesso.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponsetDto> update(@PathVariable Long id, @RequestBody @Valid ProductRequestDto dto) {
        ProductResponsetDto updatedProduct = productService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
    }



}
