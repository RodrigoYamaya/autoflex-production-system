package com.projedata.backend.repository;

import com.projedata.backend.model.entities.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {
}
