package com.projedata.backend.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CompositionItemRequestDTo(
        @NotNull(message = "O ID da matéria-prima é obrigatório")
        Long rawMaterialId,

        @NotNull(message = "A quantidade necessária é obrigatória")
        @Min(value = 1, message = "A quantidade deve ser pelo menos 1")
        Integer requiredQuantity
) {
}
