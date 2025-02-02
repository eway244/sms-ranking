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
    <div class="post-categories">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterByCategory(category)"
      >
        {{ category }}
      </button>
    </div>
    <div class="posts">
      <div
        class="post"
        v-for="post in filteredPosts"
        :key="post.id"
        @click="goToPostDetail(post.id)"
      >
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <span>作者: {{ post.author }}</span>
      </div>
    </div>
    <pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="changePage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      posts: [],
      searchQuery: '',
      categories: ['技术讨论', '生活交流', '其他'],
      selectedCategory: null,
      currentPage: 1,
      postsPerPage: 10,
    };
  },
  computed: {
    filteredPosts() {
      let filtered = this.posts;

      if (this.searchQuery) {
        filtered = filtered.filter(post =>
          post.title.includes(this.searchQuery)
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(post =>
          post.category === this.selectedCategory
        );
      }

      const start = (this.currentPage - 1) * this.postsPerPage;
      return filtered.slice(start, start + this.postsPerPage);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    },
  },
  methods: {
    filterPosts() {
      this.currentPage = 1;
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    changePage(page) {
      this.currentPage = page;
    },
    goToPostDetail(postId) {
      this.$router.push({ name: 'PostDetail', params: { id: postId } });
    },
    fetchPosts() {
      // 这里可以调用 API 获取帖子数据
      // 示例数据
      this.posts = [
        { id: 1, title: '帖子一', content: '内容一', author: '用户A', category: '技术讨论' },
        { id: 2, title: '帖子二', content: '内容二', author: '用户B', category: '生活交流' },
        // 更多帖子...
      ];
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
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>