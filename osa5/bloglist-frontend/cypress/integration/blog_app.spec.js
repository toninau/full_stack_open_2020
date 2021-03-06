describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test_user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test_user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_user', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('title created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('url created by cypress')
      cy.get('#create-button').click()
      cy.contains('a new blog title created by cypress by author created by cypress added')
      cy.get('.blogs')
        .should('contain', 'author created by cypress')
        .and('contain', 'author created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'author',
          url: 'url',
          likes: 0
        })
        cy.createBlog({
          title: 'second blog',
          author: 'author',
          url: 'url',
          likes: 0
        })
      })
      it('one of those can be liked', function () {
        cy.contains('first blog').parent().find('#view-button').click()
        cy.contains('first blog').parent().find('#like-button').click()
        cy.get('.blog:first').should('contain', 'likes 1')
      })
      it('one of those can be deleted', function () {
        cy.contains('second blog').parent().find('#view-button').click()
        cy.contains('second blog').parent().find('#remove-button').click()
        cy.contains('Deleted second blog by author')
        cy.get('.blogs').should('not.contain', 'second blog')
        cy.get('.blogs').should('contain', 'first blog')
      })
      it('sorts blogs by the likes', function() {
        cy.contains('second blog').parent().find('#view-button').click()
        cy.contains('second blog').parent().find('#like-button').click()
        cy.get('.blog:first').should('contain', 'second blog')
        cy.get('.blog:last').should('contain', 'first blog')
        cy.contains('first blog').parent().find('#view-button').click()
        cy.contains('first blog').parent().find('#like-button').as('theButton').click()
        cy.get('@theButton').click()
        cy.get('.blog:first').should('contain', 'first blog')
        cy.get('.blog:last').should('contain', 'second blog')
      })
    })
  })
})