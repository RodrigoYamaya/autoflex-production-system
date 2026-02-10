package com.projedata.backend.controller;

import com.projedata.backend.model.dto.ProductionPlanResponseDTO;
import com.projedata.backend.service.ProductionPlanningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/production-plan")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductionPlanningController {

    private final ProductionPlanningService service;

    @PostMapping("/calculate")
    public ResponseEntity<ProductionPlanResponseDTO> getProductionPlan() {
        return ResponseEntity.ok(service.calculateProductionPlan());
    }
}
