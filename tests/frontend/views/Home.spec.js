import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders welcome message', () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain('欢迎来到我的网站');
  });

  it('has a navigation link', () => {
    const wrapper = mount(Home);
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe('前往帖子列表');
  });
});