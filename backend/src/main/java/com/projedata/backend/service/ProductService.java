package com.projedata.backend.service;

import com.projedata.backend.mapper.ProductMapper;
import com.projedata.backend.model.dto.CompositionItemRequestDTo;
import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.model.entities.Product;
import com.projedata.backend.model.entities.ProductComposition;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.ProductRepository;
import com.projedata.backend.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMapper productMapper;

    @Transactional
    public ProductResponsetDto save(ProductRequestDto Productdto) {
        Product product = productMapper.toEntity(Productdto);

        if (Productdto.compositions() != null && !Productdto.compositions().isEmpty()) {
            for (CompositionItemRequestDTo itemDto : Productdto.compositions()) {

                RawMaterial rawMaterial = rawMaterialRepository.findById(itemDto.rawMaterialId())
                        .orElseThrow(() -> new RuntimeException("Matéria-prima não encontrada: ID " + itemDto.rawMaterialId()));

                ProductComposition composition = new ProductComposition();
                composition.setProduct(product);
                composition.setRawMaterial(rawMaterial);
                composition.setRequiredQuantity(itemDto.requiredQuantity());

                product.getCompositions().add(composition);
            }
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    public List<ProductResponsetDto> findAll() {
        return productRepository.findAllByOrderByPriceDesc().stream()
                .map(productMapper::toDto)
                .toList();
    }

}
