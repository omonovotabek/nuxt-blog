<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Название" />

    <el-table-column label="Дата">
      <template slot-scope="{ row: { date } }">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          new Date(date).toLocaleString()
        }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Просмотры">
      <template slot-scope="{ row: { views } }">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Коментарии">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Действия">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Открить пост">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="open(row._id)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Удалить пост">
          <el-button
            icon="el-icon-delete"
            type="danger"
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return { posts };
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}?test=123`)
    },
    async remove(id) {
      try {
        await this.$confirm('Удалить пост?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })
        const ad = await this.$store.dispatch('post/remove', id)
        //  console.log(ad)
        this.posts = this.posts.filter(p => p._id !== id)
        this.$message.success('Пост удален')
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
</style>