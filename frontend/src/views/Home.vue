<template>
  <div class="home">
    <h1>欢迎来到我们的社区!</h1>
    <p>在这里，您可以分享您的想法，参与讨论，并与其他用户互动。</p>
    <router-link to="/post-list" class="btn">查看帖子</router-link>
    <router-link to="/login" class="btn">登录</router-link>
    <router-link to="/register" class="btn">注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>