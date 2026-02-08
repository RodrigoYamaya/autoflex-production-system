package com.projedata.backend.controller;

import com.projedata.backend.model.dto.ProductionPlanResponseDTO;
import com.projedata.backend.service.ProductionPlanningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/production-planning")
@RequiredArgsConstructor
public class ProductionPlanningController {

    private final ProductionPlanningService service;

    @GetMapping
    public ResponseEntity<ProductionPlanResponseDTO> getProductionPlan() {
        return ResponseEntity.ok(service.calculateProductionPlan());
    }
}
