describe('Login Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login'); // 访问登录页面
  });

  it('should display login form', () => {
    cy.get('form').should('exist'); // 确保表单存在
    cy.get('input[name="username"]').should('be.visible'); // 确保用户名输入框可见
    cy.get('input[name="password"]').should('be.visible'); // 确保密码输入框可见
    cy.get('button[type="submit"]').should('be.visible'); // 确保提交按钮可见
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="username"]').type('invalidUser'); // 输入无效用户名
    cy.get('input[name="password"]').type('invalidPassword'); // 输入无效密码
    cy.get('button[type="submit"]').click(); // 提交表单

    cy.get('.error-message').should('contain', '用户名或密码错误'); // 检查错误消息
  });

  it('should log in with valid credentials', () => {
    cy.get('input[name="username"]').type('validUser'); // 输入有效用户名
    cy.get('input[name="password"]').type('validPassword'); // 输入有效密码
    cy.get('button[type="submit"]').click(); // 提交表单

    cy.url().should('include', '/home'); // 确保重定向到主页
    cy.get('.welcome-message').should('contain', '欢迎回来'); // 检查欢迎消息
  });

  it('should navigate to forgot password page', () => {
    cy.get('a[href="/forgot-password"]').click(); // 点击忘记密码链接
    cy.url().should('include', '/forgot-password'); // 确保重定向到忘记密码页面
  });
});