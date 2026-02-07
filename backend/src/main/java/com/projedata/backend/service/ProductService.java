package com.projedata.backend.service;

import com.projedata.backend.mapper.ProductMapper;
import com.projedata.backend.model.dto.CompositionItemRequestDTo;
import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.model.entities.Product;
import com.projedata.backend.model.entities.ProductComposition;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.ProductCompositionRepository;
import com.projedata.backend.repository.ProductRepository;
import com.projedata.backend.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMapper productMapper;
    private final ProductCompositionRepository productCompositionRepository;

    @Transactional
    public ProductResponsetDto save(ProductRequestDto productRequestDto) {
        Product product = productMapper.toEntity(productRequestDto);

        product = productRepository.save(product);

        List<ProductComposition> listaParaSalvar = new ArrayList<>();

        if (productRequestDto.compositions() != null && !productRequestDto.compositions().isEmpty()) {
            for (CompositionItemRequestDTo itemDto : productRequestDto.compositions()) {

                RawMaterial rawMaterial = rawMaterialRepository.findById(itemDto.rawMaterialId())
                        .orElseThrow(() -> new RuntimeException("Matéria-prima não encontrada"));

                ProductComposition composition = new ProductComposition();
                composition.setProduct(product);
                composition.setRawMaterial(rawMaterial);
                composition.setRequiredQuantity(itemDto.requiredQuantity());

                listaParaSalvar.add(composition);
            }

            productCompositionRepository.saveAll(listaParaSalvar);

            product.setCompositions(listaParaSalvar);
        }

        return productMapper.toDto(product);
        //resumo sobre o problema que estava acontecendo que os ingredientes não estava salvando [] null.
        //estava em si na regra de negocio que primeiro tinhamos que salvar o product primeiro apos ID desse product salvar os ingrdientes que estava causando conflito pai/filho precisamos ID
        //O que estava ocorrendo que estava tentando salvar filho antes do pai e não tinhamos o ID product que ingredientes tb_productComposition fica [] não ID comosição
    }

    @Transactional
    public List<ProductResponsetDto> findAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .toList();
    }


    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado para exclusão");
        }
        productRepository.deleteById(id);
    }


    @Transactional
    public ProductResponsetDto update(Long id, ProductRequestDto dto) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        entity.setName(dto.name());
        entity.setPrice(dto.price());

        if (dto.compositions() != null) {
            entity.getCompositions().clear();

            for (CompositionItemRequestDTo itemDto : dto.compositions()) {

                RawMaterial rawMaterial = rawMaterialRepository.findById(itemDto.rawMaterialId())
                        .orElseThrow(() -> new RuntimeException("Matéria-prima não encontrada"));

                ProductComposition composition = new ProductComposition();
                composition.setProduct(entity);
                composition.setRawMaterial(rawMaterial);
                composition.setRequiredQuantity(itemDto.requiredQuantity());

                entity.getCompositions().add(composition);
            }
        }

        entity = productRepository.save(entity);

        return productMapper.toDto(entity);
    }

}
