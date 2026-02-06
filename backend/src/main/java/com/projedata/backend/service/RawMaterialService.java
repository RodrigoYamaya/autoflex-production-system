package com.projedata.backend.service;

import com.projedata.backend.mapper.RawMaterialMapper;
import com.projedata.backend.model.dto.RawMaterialRequestDTo;
import com.projedata.backend.model.dto.RawMaterialResponseDTo;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final  RawMaterialRepository rawMaterialRepository;
    private final RawMaterialMapper rawMaterialMapper;


    @Transactional
    public RawMaterialResponseDTo save(RawMaterialRequestDTo dto) {
        RawMaterial entity = rawMaterialMapper.toEntity(dto);
        RawMaterial savedEntity = rawMaterialRepository.save(entity);
        return rawMaterialMapper.toResponse(savedEntity);
    }


    public List<RawMaterialResponseDTo> findAll() {
        return rawMaterialRepository.findAll().stream()
                .map(rawMaterialMapper::toResponse)
                .toList();
    }

    public RawMaterial findById(Long id) {
        return rawMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matéria-prima não encontrada com ID: " + id));
    }

}
