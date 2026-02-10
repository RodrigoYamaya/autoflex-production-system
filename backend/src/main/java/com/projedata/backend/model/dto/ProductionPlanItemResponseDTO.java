package com.projedata.backend.model.dto;

import java.math.BigDecimal;

public record ProductionPlanItemResponseDTO(
        String productName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal totalValue
) {
}
