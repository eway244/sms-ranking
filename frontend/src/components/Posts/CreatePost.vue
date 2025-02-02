<template>
  <div class="create-post">
    <h2>发帖</h2>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">标题</label>
        <input type="text" v-model="title" required />
      </div>
      <div>
        <label for="content">内容</label>
        <textarea v-model="content" required></textarea>
      </div>
      <div>
        <label for="category">选择版块</label>
        <select v-model="category" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div>
        <label for="images">上传图片 (最多9张)</label>
        <input type="file" @change="handleFileUpload" multiple accept="image/*" />
      </div>
      <button type="submit">发布帖子</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      category: null,
      categories: [],
      images: [],
      errorMessage: ''
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        this.categories = await response.json();
      } catch (error) {
        this.errorMessage = '无法加载版块，请稍后再试。';
      }
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length > 9) {
        this.errorMessage = '最多只能上传9张图片。';
        return;
      }
      this.images = files;
    },
    async submitPost() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('category', this.category);
      this.images.forEach(image => {
        formData.append('images', image);
      });

      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error('发布失败，请重试。');
        }
        this.$router.push('/posts'); // Redirect to post list
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: auto;
}
.error {
  color: red;
}
</style>