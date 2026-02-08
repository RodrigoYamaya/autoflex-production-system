package com.projedata.backend.model.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductionPlanResponseDTO(
        List<ProductionPlanItemResponseDTO> productionList,
        BigDecimal grandTotalValue
) {
}
