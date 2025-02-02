<template>
  <div class="block-management">
    <h1>版块管理</h1>
    <div class="block-form">
      <input v-model="newBlockName" placeholder="输入版块名称" />
      <textarea v-model="newBlockDescription" placeholder="输入版块描述"></textarea>
      <button @click="createBlock">创建版块</button>
    </div>
    <div class="block-list">
      <h2>现有版块</h2>
      <ul>
        <li v-for="block in blocks" :key="block.id">
          <h3>{{ block.name }}</h3>
          <p>{{ block.description }}</p>
          <button @click="editBlock(block.id)">编辑</button>
          <button @click="deleteBlock(block.id)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBlockName: '',
      newBlockDescription: '',
      blocks: []
    };
  },
  methods: {
    fetchBlocks() {
      // 从后端获取版块列表
      fetch('/api/blocks')
        .then(response => response.json())
        .then(data => {
          this.blocks = data;
        });
    },
    createBlock() {
      // 创建新版块
      const blockData = {
        name: this.newBlockName,
        description: this.newBlockDescription
      };
      fetch('/api/blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blockData)
      })
      .then(() => {
        this.fetchBlocks();
        this.newBlockName = '';
        this.newBlockDescription = '';
      });
    },
    editBlock(blockId) {
      // 编辑版块逻辑
      // 这里可以实现弹出编辑框的逻辑
    },
    deleteBlock(blockId) {
      // 删除版块
      fetch(`/api/blocks/${blockId}`, {
        method: 'DELETE'
      })
      .then(() => {
        this.fetchBlocks();
      });
    }
  },
  mounted() {
    this.fetchBlocks();
  }
};
</script>

<style scoped>
.block-management {
  padding: 20px;
}
.block-form {
  margin-bottom: 20px;
}
.block-list {
  margin-top: 20px;
}
</style>