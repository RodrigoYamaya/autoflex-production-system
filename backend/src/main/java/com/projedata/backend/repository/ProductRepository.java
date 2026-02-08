package com.projedata.backend.repository;

import com.projedata.backend.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.compositions ORDER BY p.price DESC")
    List<Product> findAllWithCompositionsOrderedByPrice();
}
