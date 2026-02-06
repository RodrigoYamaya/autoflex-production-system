package com.projedata.backend.repository;

import com.projedata.backend.model.entities.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository extends JpaRepository<RawMaterial,Long> {
}
