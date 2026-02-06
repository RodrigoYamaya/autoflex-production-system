package com.projedata.backend.mapper;

import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.model.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "compositions", ignore = true)
    //Request -> Entidade (Ignora ID porque o banco gera)
    Product toEntity(ProductRequestDto dto);

    //Entidade -> response
    ProductResponsetDto toDto(Product entity);
}
