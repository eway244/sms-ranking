<template>
  <div class="rating-list">
    <h2>评分列表</h2>
    <div v-if="ratings.length === 0">暂无评分信息</div>
    <ul>
      <li v-for="rating in ratings" :key="rating.id" class="rating-item">
        <h3>{{ rating.title }}</h3>
        <p>评分: {{ rating.score }}</p>
        <p>评价: {{ rating.comment }}</p>
        <router-link :to="{ name: 'RatingDetail', params: { id: rating.id } }">查看详情</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RatingList',
  computed: {
    ...mapState(['ratings']),
  },
  created() {
    this.$store.dispatch('fetchRatings');
  },
};
</script>

<style scoped>
.rating-list {
  padding: 20px;
}

.rating-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}
</style>