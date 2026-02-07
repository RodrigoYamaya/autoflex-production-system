package com.projedata.backend.service;

import com.projedata.backend.mapper.RawMaterialMapper;
import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.model.dto.RawMaterialRequestDTo;
import com.projedata.backend.model.dto.RawMaterialResponseDTo;
import com.projedata.backend.model.entities.Product;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;
    private final RawMaterialMapper rawMaterialMapper;


    @Transactional
    public RawMaterialResponseDTo save(RawMaterialRequestDTo dto) {
        RawMaterial entity = rawMaterialMapper.toEntity(dto);
        RawMaterial savedEntity = rawMaterialRepository.save(entity);
        return rawMaterialMapper.toDto(savedEntity);
    }


    public List<RawMaterialResponseDTo> findAll() {
        return rawMaterialRepository.findAll().stream()
                .map(rawMaterialMapper::toDto)
                .toList();
    }

    public RawMaterial findById(Long id) {
        return rawMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matéria-prima não encontrada com ID: " + id));
    }

    @Transactional
    public void delete(Long id) {
        if (!rawMaterialRepository.existsById(id)) {
            throw new RuntimeException("material  não encontrado");
        }
        rawMaterialRepository.deleteById(id);
    }


    @Transactional
    public RawMaterialResponseDTo update(Long id, RawMaterialRequestDTo dto) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("material não encontrado"));

        rawMaterial.setName(dto.name());
        rawMaterial.setStockQuantity(dto.stockQuantity());

        RawMaterial updateRawMaterial = rawMaterialRepository.save(rawMaterial);
        return rawMaterialMapper.toDto(updateRawMaterial);

    }

}

