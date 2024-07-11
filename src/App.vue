<script setup lang="ts">
// import microApp from '@micro-zoe/micro-app'
import TagsView from '@/components/TagsView/index.vue'
import MenusView from '@/components/menus/index.vue'
import AppMain from '@/components/AppMain/index.vue'
</script>

<template>

  <!-- <el-config-provider > -->
  <!-- <el-header></el-header> -->
  <el-container>
    <el-container>
      <el-aside class="el-aside">
        <MenusView></MenusView>
      </el-aside>
      <el-main style="padding:0 0 0 15px">
        <TagsView></TagsView>
        <AppMain class="m-t-1"></AppMain>
      </el-main>
    </el-container>
  </el-container>

  <!-- 工品一号 -->


  <!-- </el-config-provider> -->
</template>

<style scoped>
.el-aside {
  background: #fff;
  width: 160px;
  text-align: center;
}
</style>
