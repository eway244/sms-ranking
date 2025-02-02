<template>
  <div class="rating-detail">
    <h2>评分详情</h2>
    <div v-if="rating">
      <h3>{{ rating.title }}</h3>
      <p>评分: {{ rating.score }}</p>
      <p>评价: {{ rating.comment }}</p>
      <p>评分时间: {{ new Date(rating.createdAt).toLocaleString() }}</p>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
    <router-link to="/ratings">返回评分列表</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: null,
    };
  },
  created() {
    this.fetchRatingDetail();
  },
  methods: {
    async fetchRatingDetail() {
      const ratingId = this.$route.params.id;
      try {
        const response = await fetch(`/api/ratings/${ratingId}`);
        if (response.ok) {
          this.rating = await response.json();
        } else {
          console.error('获取评分详情失败');
        }
      } catch (error) {
        console.error('请求错误:', error);
      }
    },
  },
};
</script>

<style scoped>
.rating-detail {
  padding: 20px;
}
.rating-detail h2 {
  margin-bottom: 20px;
}
.rating-detail h3 {
  margin: 10px 0;
}
</style>