<template>
  <div class="admin-layout-wrap">
    <el-container>
      <el-aside width="250px">
        <app-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from "@/components/admin/Aside";
export default {
  components: {
    AppAside,
  },
};
</script>

<style scoped>
.admin-layout-wrap {
  width: 100%;
  height: 100vh;
}
</style>
