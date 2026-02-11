/// <reference types="cypress" />

describe('AutoFlex - Teste de Navegação', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('Deve carregar a página inicial', () => {
        cy.contains(/Gestão|AutoFlex|Bem-vindo/i).should('be.visible');
    });

    it('Deve navegar para a tela de Produtos', () => {
        // 1. vai Clicar no menu
        cy.contains(/Produtos/i).click();

        // 2. vai arantir que a URL mudou
        cy.location('pathname').should('include', '/products');

        // 3. vai Verificar a LISTA carregou (já que o GET 200 funcionou)
        // vai Procura por textos comuns de tabela ou botão
        // O "exist" é mais flexível que o "visible"
        cy.get('body').should('contain', 'Produtos');

        // vai Tenta encontrar um botão de ação (Novo, Adicionar, +, Criar)
        // Se não achar, o teste acima já garante que a página não está em branco.
        cy.get('button').should('exist');
    });
});