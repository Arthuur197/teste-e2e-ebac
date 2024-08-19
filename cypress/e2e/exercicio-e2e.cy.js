/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
  
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')
      });
   
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      let qtd = 3
      cy.get('#primary-menu > .menu-item-629 > a').click()
      cy.get('.post-2559 > .product-block').click()
      cy.get('.button-variable-item-M').click()
      cy.get('.button-variable-item-Red').click()
      cy.get('.input-text').clear().type(qtd)
      cy.get('.single_add_to_cart_button').click()
      cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
          
      cy.get('.woocommerce-message > .button').click()
      cy.get('.checkout-button').click()
  
      cy.get('#billing_first_name').type('João') 
      cy.get('#billing_last_name').type('Silva') 
      cy.get('#billing_address_1').type('Rua Principal, 123')
      cy.get('#billing_city').type('São Paulo')
      cy.get('#billing_postcode').type('12345-678')
      cy.get('#billing_phone').type('999999999')
      cy.get('#billing_email').type('aluno_ebac@teste.com')
  
      cy.get('#payment_method_cod').check()
      cy.get('#terms').click()
      cy.get('#place_order').click()
  
      cy.get('.woocommerce-thankyou-order-received').should('exist')
      cy.get('.woocommerce-thankyou-order-received').should('contain', 'Obrigado. Seu pedido foi recebido.')
    })
  })