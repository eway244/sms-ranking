<template>
  <div class="forgot-password">
    <h2>忘记密码</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="phone">手机号</label>
        <input
          type="text"
          id="phone"
          v-model="phone"
          @blur="validatePhone"
          required
        />
        <span v-if="phoneError" class="error">{{ phoneError }}</span>
      </div>
      <div class="form-group">
        <label for="verificationCode">验证码</label>
        <input
          type="text"
          id="verificationCode"
          v-model="verificationCode"
          required
        />
      </div>
      <button type="button" @click="sendVerificationCode">发送验证码</button>
      <div class="form-group">
        <label for="newPassword">新密码</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          @blur="validatePassword"
          required
        />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <button type="submit">重置密码</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      verificationCode: '',
      newPassword: '',
      phoneError: '',
      passwordError: '',
    };
  },
  methods: {
    validatePhone() {
      const phoneRegex = /^[1][3-9][0-9]{9}$/;
      this.phoneError = phoneRegex.test(this.phone) ? '' : '手机号格式不正确';
    },
    validatePassword() {
      this.passwordError = this.newPassword.length >= 6 ? '' : '密码至少6位';
    },
    sendVerificationCode() {
      if (!this.phoneError) {
        // 发送验证码的逻辑
        alert('验证码已发送');
      }
    },
    submitForm() {
      if (!this.phoneError && !this.passwordError) {
        // 提交重置密码的逻辑
        alert('密码重置成功');
      }
    },
  },
};
</script>

<style scoped>
.forgot-password {
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 15px;
}
.error {
  color: red;
  font-size: 12px;
}
</style>