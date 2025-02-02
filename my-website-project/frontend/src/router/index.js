import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import PostList from '../views/PostList.vue';
import PostDetail from '../views/PostDetail.vue';
import RatingList from '../views/RatingList.vue';
import RatingDetail from '../views/RatingDetail.vue';
import UserManagement from '../components/Admin/UserManagement.vue';
import BlockManagement from '../components/Admin/BlockManagement.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/posts',
      name: 'PostList',
      component: PostList,
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: PostDetail,
    },
    {
      path: '/ratings',
      name: 'RatingList',
      component: RatingList,
    },
    {
      path: '/ratings/:id',
      name: 'RatingDetail',
      component: RatingDetail,
    },
    {
      path: '/admin/users',
      name: 'UserManagement',
      component: UserManagement,
    },
    {
      path: '/admin/blocks',
      name: 'BlockManagement',
      component: BlockManagement,
    },
  ],
});