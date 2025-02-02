import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    ratings: [],
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    SET_RATINGS(state, ratings) {
      state.ratings = ratings;
    },
    ADD_RATING(state, rating) {
      state.ratings.push(rating);
    },
  },
  actions: {
    fetchPosts({ commit }) {
      // 这里可以添加 API 调用来获取帖子
    },
    fetchRatings({ commit }) {
      // 这里可以添加 API 调用来获取评分
    },
    registerUser({ commit }, userData) {
      // 这里可以添加 API 调用来注册用户
    },
    loginUser({ commit }, credentials) {
      // 这里可以添加 API 调用来登录用户
    },
    logoutUser({ commit }) {
      commit('SET_USER', null);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getPosts: (state) => state.posts,
    getRatings: (state) => state.ratings,
  },
});