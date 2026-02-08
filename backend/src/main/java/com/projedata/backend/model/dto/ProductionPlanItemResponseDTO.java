package com.projedata.backend.model.dto;

import java.math.BigDecimal;

public record ProductionPlanItemResponseDTO(
        String productName,
        Integer quantityToProduce,
        BigDecimal unitPrice,
        BigDecimal totalValue
) {
}
