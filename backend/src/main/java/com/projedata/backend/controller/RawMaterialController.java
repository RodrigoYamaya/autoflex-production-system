package com.projedata.backend.controller;

import com.projedata.backend.model.dto.ProductRequestDto;
import com.projedata.backend.model.dto.ProductResponsetDto;
import com.projedata.backend.model.dto.RawMaterialRequestDTo;
import com.projedata.backend.model.dto.RawMaterialResponseDTo;
import com.projedata.backend.service.RawMaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/raw-materials")
public class RawMaterialController {

    private final RawMaterialService  rawMaterialService;

    @PostMapping("/save")
    public ResponseEntity<RawMaterialResponseDTo> save(@RequestBody @Valid RawMaterialRequestDTo rawMaterialRequestDTo) {
        RawMaterialResponseDTo rawMaterialSave = rawMaterialService.save(rawMaterialRequestDTo);
        return ResponseEntity.status(HttpStatus.CREATED).body(rawMaterialSave);
    }


    @GetMapping
    public ResponseEntity<List<RawMaterialResponseDTo>> findAll() {
        return ResponseEntity.ok(rawMaterialService.findAll());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") long id) {
        rawMaterialService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("material com o ID " + id + " deletado com sucesso.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTo> update(@PathVariable Long id, @RequestBody @Valid RawMaterialRequestDTo dto) {
        RawMaterialResponseDTo updatedMaterial = rawMaterialService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedMaterial);
    }



}
