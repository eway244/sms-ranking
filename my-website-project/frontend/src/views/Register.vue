<template>
  <div class="register">
    <h2>用户注册</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">账户名</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="phone">手机号</label>
        <input type="tel" v-model="phone" required />
      </div>
      <div>
        <label for="password">密码</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="realName">真实姓名</label>
        <input type="text" v-model="realName" />
      </div>
      <div>
        <label for="class">班级</label>
        <input type="text" v-model="className" />
      </div>
      <button type="submit">注册</button>
    </form>
    <p>已有账户？<router-link to="/login">登录</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      phone: '',
      password: '',
      realName: '',
      className: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await this.$http.post('/api/auth/register', {
          username: this.username,
          phone: this.phone,
          password: this.password,
          realName: this.realName,
          className: this.className
        });
        if (response.data.success) {
          this.$router.push('/login');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert('注册失败，请重试。');
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
}
.register h2 {
  text-align: center;
}
.register form {
  display: flex;
  flex-direction: column;
}
.register div {
  margin-bottom: 15px;
}
.register label {
  margin-bottom: 5px;
}
.register input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register button:hover {
  background-color: #0056b3;
}
</style>