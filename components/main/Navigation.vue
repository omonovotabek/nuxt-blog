<template>
  <nav>
    <div>
      <el-button
        v-for="btn of btns"
        :key="btn.id"
        :type="btn.type"
        @click="
          () => {
            activBtn(btn.id);
            getSort(btn.name);
          }
        "
        >{{ btn.name }}</el-button
      >
    </div>
    <div>
      <el-button type="info" @click="adminPage">Admin</el-button>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["getSort"],
  data() {
    return {
      btns: [
        { id: 1, type: "default", name: "Images" },
        { id: 2, type: "default", name: "Videos" },
        { id: 3, type: "default", name: "Audios" },
        { id: 4, type: "default", name: "Documents" },
      ],
    };
  },
  methods: {
    activBtn(id) {
      this.btns.forEach((btn) => {
        if (btn.id === id) {
          btn.type = "primary";
        } else {
          btn.type = "default";
        }
      });
    },
    adminPage() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
}
</style>
