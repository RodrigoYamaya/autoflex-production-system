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

        // 5. O Algoritmo "Guloso" (Greedy)
        for (Product product : allProducts) {

            // Se o produto não tem receita, ignora
            if (product.getCompositions() == null || product.getCompositions().isEmpty()) {
                continue;
            }

            // Descobrir quantos podemos produzir deste produto com o estoque ATUAL (que sobra)
            int maxProducible = calculateMaxQuantity(product, stockMap);

            if (maxProducible > 0) {
                // Calcula o valor total deste lote
                BigDecimal totalValue = product.getPrice().multiply(BigDecimal.valueOf(maxProducible));

                // Adiciona na lista de resposta
                planItems.add(new ProductionPlanItemResponseDTO(
                        product.getName(),
                        maxProducible,
                        product.getPrice(),
                        totalValue
                ));

                // Atualiza o Valor Total Geral
                grandTotalValue = grandTotalValue.add(totalValue);

                // DEDUZIR do estoque temporário os materiais usados
                deductStock(product, maxProducible, stockMap);
            }
        }

        return new ProductionPlanResponseDTO(planItems, grandTotalValue);
    }


    // Método auxiliar: Calcula o máximo que dá pra fazer baseado no ingrediente mais escasso
    private int calculateMaxQuantity(Product product, Map<Long, Integer> stockMap) {
        int maxQuantity = Integer.MAX_VALUE;

        for (ProductComposition composition : product.getCompositions()) {
            Long rawMaterialId = composition.getRawMaterial().getId();
            Integer requiredPerUnit = composition.getRequiredQuantity();
            Integer availableStock = stockMap.getOrDefault(rawMaterialId, 0);

            if (requiredPerUnit == 0) continue;

            // Quantos dá pra fazer com ESTE ingrediente específico?
            int possibleWithThisIngredient = availableStock / requiredPerUnit;

            // O gargalo da produção é sempre o ingrediente que tem menos disponibilidade relativa
            maxQuantity = Math.min(maxQuantity, possibleWithThisIngredient);
        }

        // Se maxQuantity continuou MAX_VALUE, significa que não tem restrição (ou receita vazia),
        // mas vamos retornar 0 por segurança se a lista de composição for válida.
        return (maxQuantity == Integer.MAX_VALUE) ? 0 : maxQuantity;
    }

    // Método auxiliar: Atualiza o mapa de estoque (Simula o consumo)
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
