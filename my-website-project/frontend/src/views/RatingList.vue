<template>
  <div class="rating-list">
    <h1>评分列表</h1>
    <div v-if="ratings.length === 0">
      <p>暂无评分信息。</p>
    </div>
    <ul>
      <li v-for="rating in ratings" :key="rating.id">
        <router-link :to="{ name: 'RatingDetail', params: { id: rating.id } }">
          <h2>{{ rating.title }}</h2>
          <p>评分: {{ rating.averageScore }} 分</p>
          <p>评价人数: {{ rating.reviewCount }}</p>
        </router-link>
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

.rating-list h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.rating-list ul {
  list-style-type: none;
  padding: 0;
}

.rating-list li {
  margin-bottom: 15px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.rating-list a {
  text-decoration: none;
  color: #333;
}

.rating-list a:hover {
  text-decoration: underline;
}
</style>