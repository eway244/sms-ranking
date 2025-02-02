<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th>账户名</th>
            <th>真实姓名</th>
            <th>班级</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.realName }}</td>
            <td>{{ user.class }}</td>
            <td>{{ user.isVerified ? '已认证' : '未认证' }}</td>
            <td>
              <button @click="toggleVerification(user.id)">
                {{ user.isVerified ? '取消认证' : '认证用户' }}
              </button>
              <button @click="deleteUser(user.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods: {
    fetchUsers() {
      // 调用后端 API 获取用户数据
      this.$http.get(`/api/admin/users?page=${this.currentPage}`)
        .then(response => {
          this.users = response.data.users;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          console.error("获取用户数据失败:", error);
        });
    },
    toggleVerification(userId) {
      // 调用后端 API 切换用户认证状态
      this.$http.post(`/api/admin/users/${userId}/verify`)
        .then(() => {
          this.fetchUsers();
        })
        .catch(error => {
          console.error("切换认证状态失败:", error);
        });
    },
    deleteUser(userId) {
      // 调用后端 API 删除用户
      this.$http.delete(`/api/admin/users/${userId}`)
        .then(() => {
          this.fetchUsers();
        })
        .catch(error => {
          console.error("删除用户失败:", error);
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchUsers();
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.user-management {
  padding: 20px;
}
.user-list {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
.pagination {
  display: flex;
  justify-content: space-between;
}
</style>