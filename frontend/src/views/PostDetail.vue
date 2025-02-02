<template>
  <div class="post-detail">
    <h1>{{ post.title }}</h1>
    <div class="post-content" v-html="post.content"></div>
    <div class="post-meta">
      <span>作者: {{ post.author }}</span>
      <span>发布时间: {{ post.createdAt }}</span>
    </div>
    
    <div class="comments-section">
      <h2>评论</h2>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p><strong>{{ comment.author }}:</strong> {{ comment.content }}</p>
      </div>
      
      <div class="comment-form">
        <textarea v-model="newComment" placeholder="添加评论..."></textarea>
        <button @click="submitComment">提交评论</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      comments: [],
      newComment: ''
    };
  },
  created() {
    this.fetchPost();
    this.fetchComments();
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.id;
      // 假设有一个 API 可以获取帖子详情
      fetch(`/api/posts/${postId}`)
        .then(response => response.json())
        .then(data => {
          this.post = data;
        });
    },
    fetchComments() {
      const postId = this.$route.params.id;
      // 假设有一个 API 可以获取评论
      fetch(`/api/posts/${postId}/comments`)
        .then(response => response.json())
        .then(data => {
          this.comments = data;
        });
    },
    submitComment() {
      const postId = this.$route.params.id;
      const commentData = {
        content: this.newComment,
        author: '当前用户' // 这里可以替换为实际用户信息
      };
      // 假设有一个 API 可以提交评论
      fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      })
      .then(response => response.json())
      .then(data => {
        this.comments.push(data);
        this.newComment = '';
      });
    }
  }
};
</script>

<style scoped>
.post-detail {
  padding: 20px;
}
.post-content {
  margin: 20px 0;
}
.comments-section {
  margin-top: 40px;
}
.comment {
  margin-bottom: 10px;
}
.comment-form {
  margin-top: 20px;
}
</style>