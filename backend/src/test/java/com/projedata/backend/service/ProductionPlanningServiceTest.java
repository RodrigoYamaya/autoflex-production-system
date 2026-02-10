package com.projedata.backend.service;

import com.projedata.backend.model.dto.ProductionPlanResponseDTO;
import com.projedata.backend.model.entities.Product;
import com.projedata.backend.model.entities.ProductComposition;
import com.projedata.backend.model.entities.RawMaterial;
import com.projedata.backend.repository.ProductRepository;
import com.projedata.backend.repository.RawMaterialRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductionPlanningServiceTest {

    //vamos criar um objeto que vai simular banco de dados
    @Mock
    private ProductRepository productRepository;

    @Mock
    private RawMaterialRepository rawMaterialRepository;


    //@InjectMocks: injetar as  uma instancia real na service. que nos criamos la em cima objetos falsos(mock)
    //nesse ele vai chamar os mock os objetos falsos que nso criamos
    @InjectMocks
    private ProductionPlanningService productionPlanningService;

    @Test
    // @DisplayName:Eo Nome que vai constar no relatório de testes.
    @DisplayName("Deve priorizar produtos mais caros e não listar produtos sem estoque")
    void shouldPrioritizeExpensiveProductsAndCalculateCorrectly() {
        // --- CENÁRIO (GIVEN) ---//

        //Aki vamos  criasr a  matéria-prima fictícia: "Ferro" com 100 unidades no estoque.
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("Ferro");
        rawMaterial.setStockQuantity(100);

        // ---  aki vamos ciar  o Produto 1 (O Caro) ---
        Product produtoCaro = new Product();
        produtoCaro.setId(1L);
        produtoCaro.setName("Notebook Gamer");
        produtoCaro.setPrice(new BigDecimal("500.00"));

        // Aki vamos criar o Notebook que vai gastar 10 unidades do Ferro.
        ProductComposition compoCaro = new ProductComposition();
        compoCaro.setRawMaterial(rawMaterial);
        compoCaro.setRequiredQuantity(10);
        produtoCaro.setCompositions(List.of(compoCaro));

        // ---Aki vamos criar um Produto 2 que vai ser mais barato ---//
        Product produtoBarato = new Product();
        produtoBarato.setId(2L);
        produtoBarato.setName("Banco Praça");
        produtoBarato.setPrice(new BigDecimal("100.00"));

        // aki  Dizemos que o Banco gasta 5 unidades de Ferro.
        ProductComposition compoBarato = new ProductComposition();
        compoBarato.setRawMaterial(rawMaterial);
        compoBarato.setRequiredQuantity(5);
        produtoBarato.setCompositions(List.of(compoBarato));

        //vai retornar a lista dos preços em ordem do maior 
        when(productRepository.findAllWithCompositionsOrderedByPrice())
                .thenReturn(Arrays.asList(produtoCaro, produtoBarato));

        //vai retornar lista dos materias(when e semlehante metodo estatico)
        when(rawMaterialRepository.findAll())
                .thenReturn(List.of(rawMaterial));

        // --- EXECUÇÃO (WHEN) ---
        ProductionPlanResponseDTO resultado = productionPlanningService.calculateProductionPlan();

        // --- VERIFICAÇÃO (THEN) ---

        // Verifica se a lista final tem TAMANHO 1.
        // Por que 1? Porque o Notebook gastou todo o estoque (100).
        // Sobrou 0 para o Banco de Praça. Seu código tem um "if > 0", então o Banco sumiu da lista.
        assertEquals(1, resultado.items().size());

        // Confere a matemática:
        // Estoque (100) / Custo (10) = 10 Unidades produzidas.
        assertEquals("Notebook Gamer", resultado.items().get(0).productName());
        assertEquals(10, resultado.items().get(0).quantity());

        // Confere o Valor Total Geral:
        // 10 unidades * R$ 500,00 = R$ 5.000,00
        assertEquals(new BigDecimal("5000.00"), resultado.grandTotal());
    }
}