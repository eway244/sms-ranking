<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">账户名或手机号</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
      <div class="form-footer">
        <router-link to="/register">注册新账户</router-link>
        <router-link to="/forgot-password">忘记密码？</router-link>
      </div>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$http.post('/api/auth/login', {
          username: this.username,
          password: this.password
        });
        // 处理登录成功逻辑，例如保存 token
        this.$router.push('/'); // 登录成功后跳转到主页
      } catch (error) {
        this.errorMessage = '登录失败，请检查您的账户名和密码。';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>