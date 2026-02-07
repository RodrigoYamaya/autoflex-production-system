package com.projedata.backend.model.dto;

public record CompositionItemResponseDTo(
        Long rawMaterialId,
        String rawMaterialName,
        Integer requiredQuantity
) {
}
