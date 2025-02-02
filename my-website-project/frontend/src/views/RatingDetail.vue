<template>
  <div class="rating-detail">
    <h1>评分详情</h1>
    <div v-if="rating">
      <h2>{{ rating.title }}</h2>
      <p>评分: {{ rating.score }}</p>
      <p>评价: {{ rating.comment }}</p>
      <p>评分时间: {{ new Date(rating.createdAt).toLocaleString() }}</p>
      <h3>评分分布</h3>
      <div>
        <canvas id="ratingDistributionChart"></canvas>
      </div>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchRatingDetail } from '@/api/rating';

export default {
  name: 'RatingDetail',
  setup() {
    const rating = ref(null);

    const loadRatingDetail = async () => {
      const ratingId = /* 从路由获取评分ID */;
      rating.value = await fetchRatingDetail(ratingId);
      renderChart();
    };

    const renderChart = () => {
      const ctx = document.getElementById('ratingDistributionChart').getContext('2d');
      const data = {
        labels: ['0-1', '2-3', '4-5', '6-7', '8-9', '10'],
        datasets: [{
          label: '评分分布',
          data: rating.value.distribution,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    onMounted(loadRatingDetail);

    return {
      rating
    };
  }
};
</script>

<style scoped>
.rating-detail {
  padding: 20px;
}
</style>