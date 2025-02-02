<template>
  <div class="post-list">
    <h1>帖子列表</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索帖子..."
        @input="filterPosts"
      />
    </div>
    <div class="filter">
      <select v-model="selectedCategory" @change="filterPosts">
        <option value="">所有分类</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <ul>
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <span>作者: {{ post.author }}</span>
        </router-link>
      </li>
    </ul>
    <div v-if="filteredPosts.length === 0">
      <p>没有找到相关帖子。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      searchQuery: '',
      selectedCategory: '',
      categories: ['技术讨论', '生活交流', '其他'],
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const matchesSearch = post.title.includes(this.searchQuery) || post.content.includes(this.searchQuery);
        const matchesCategory = this.selectedCategory ? post.category === this.selectedCategory : true;
        return matchesSearch && matchesCategory;
      });
    },
  },
  methods: {
    filterPosts() {
      // 过滤帖子逻辑
    },
    fetchPosts() {
      // 从 API 获取帖子数据
      // 示例：this.posts = await fetchPostsFromAPI();
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.post-list {
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
.filter {
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 15px;
}
</style>