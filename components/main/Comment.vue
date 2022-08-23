<template>
  <el-card class="comment">
    <div class="comment-header">
      <span>{{comment.name}}</span>
      <span>
        <i class="el-icon-time"></i>
        {{new Date(comment.date).toLocaleString()}}
      </span>
    </div>
    <div class="comment-text">
       {{comment.text}}
    </div> 
  </el-card>
</template>

<script>
export default {
  props: {
    comment:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
 .comment {
    margin-bottom: 1rem;
 }
 .comment-header {
   display: flex;
   justify-content: space-between;
   margin-bottom: 0.5rem;
 } 
  .comment-text {
    white-space: pre-line;
  }
</style>