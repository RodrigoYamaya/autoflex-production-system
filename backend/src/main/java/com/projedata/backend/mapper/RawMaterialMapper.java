package com.projedata.backend.mapper;

import com.projedata.backend.model.dto.RawMaterialRequestDTo;
import com.projedata.backend.model.dto.RawMaterialResponseDTo;
import com.projedata.backend.model.entities.RawMaterial;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RawMaterialMapper {

    // Request -> Entidade (Ignora ID porque o banco gera)
    @Mapping(target = "id", ignore = true)
    RawMaterial toEntity(RawMaterialRequestDTo dto);

    // Entidade -> Response
    RawMaterialResponseDTo toResponse(RawMaterial entity);
}
