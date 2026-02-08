package com.projedata.backend.service;

import com.projedata.backend.model.dto.ProductionPlanItemResponseDTO;
import com.projedata.backend.model.dto.ProductionPlanResponseDTO;
import com.projedata.backend.model.entities.Product;
import com.projedata.backend.model.entities.ProductComposition;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.ProductRepository;
import com.projedata.backend.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductionPlanningService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    @Transactional
    public ProductionPlanResponseDTO calculateProductionPlan() {

        List<Product> allProducts = productRepository.findAllWithCompositionsOrderedByPrice();
        List<RawMaterial> allMaterials = rawMaterialRepository.findAll();

        Map<Long, Integer> stockMap = allMaterials.stream()
                .collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));;

        List<ProductionPlanItemResponseDTO> planItems = new ArrayList<>();
        BigDecimal grandTotalValue = BigDecimal.ZERO;

        for (Product product : allProducts) {

            if (product.getCompositions() == null || product.getCompositions().isEmpty()) {
                continue;
            }

            int maxProducible = calculateMaxQuantity(product, stockMap);

            if (maxProducible > 0) {
                BigDecimal totalValue = product.getPrice().multiply(BigDecimal.valueOf(maxProducible));

                planItems.add(new ProductionPlanItemResponseDTO(
                        product.getName(),
                        maxProducible,
                        product.getPrice(),
                        totalValue
                ));

                grandTotalValue = grandTotalValue.add(totalValue);

                deductStock(product, maxProducible, stockMap);
            }
        }

        return new ProductionPlanResponseDTO(planItems, grandTotalValue);
    }


    private int calculateMaxQuantity(Product product, Map<Long, Integer> stockMap) {
        int maxQuantity = Integer.MAX_VALUE;

        for (ProductComposition composition : product.getCompositions()) {
            Long rawMaterialId = composition.getRawMaterial().getId();
            Integer requiredPerUnit = composition.getRequiredQuantity();
            Integer availableStock = stockMap.getOrDefault(rawMaterialId, 0);

            if (requiredPerUnit == 0) continue;

            int possibleWithThisIngredient = availableStock / requiredPerUnit;

            maxQuantity = Math.min(maxQuantity, possibleWithThisIngredient);
        }

        return (maxQuantity == Integer.MAX_VALUE) ? 0 : maxQuantity;
    }

    private void deductStock(Product product, int quantityToProduce, Map<Long, Integer> stockMap) {
        for (ProductComposition composition : product.getCompositions()) {
            Long rawMaterialId = composition.getRawMaterial().getId();
            Integer requiredPerUnit = composition.getRequiredQuantity();
            Integer totalNeeded = requiredPerUnit * quantityToProduce;

            Integer currentStock = stockMap.get(rawMaterialId);
            stockMap.put(rawMaterialId, currentStock - totalNeeded);
        }
    }



}
