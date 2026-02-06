package com.projedata.backend.model.dto;

public record RawMaterialResponseDTo(
        Long id,
        String name,
        Integer stockQuantity
) {
}
