package com.projedata.backend.model.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponsetDto(
        Long id,
        String name,
        BigDecimal price,

        List<CompositionItemResponseDTo> compositions
) {
}
