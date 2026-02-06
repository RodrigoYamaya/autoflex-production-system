package com.projedata.backend.repository;

import com.projedata.backend.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByPriceDesc();
}
