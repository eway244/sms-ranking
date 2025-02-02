import { mount } from '@vue/test-utils';
import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';
import ForgotPassword from '@/components/Auth/ForgotPassword.vue';

describe('Auth Components', () => {
  describe('Login.vue', () => {
    it('renders login form', () => {
      const wrapper = mount(Login);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('validates phone number', async () => {
      const wrapper = mount(Login);
      const input = wrapper.find('input[type="text"]');
      await input.setValue('1234567890');
      expect(wrapper.vm.isPhoneNumberValid).toBe(true);
    });
  });

  describe('Register.vue', () => {
    it('renders register form', () => {
      const wrapper = mount(Register);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('validates required fields', async () => {
      const wrapper = mount(Register);
      await wrapper.setData({ username: '', phone: '' });
      expect(wrapper.vm.isFormValid).toBe(false);
    });
  });

  describe('ForgotPassword.vue', () => {
    it('renders forgot password form', () => {
      const wrapper = mount(ForgotPassword);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('validates phone number for password reset', async () => {
      const wrapper = mount(ForgotPassword);
      const input = wrapper.find('input[type="text"]');
      await input.setValue('0987654321');
      expect(wrapper.vm.isPhoneNumberValid).toBe(true);
    });
  });
});