<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5 class="mb-2">工品一号</h5> -->
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item v-for="item in iframeList" @click="openMenu(item)" :index="item.name">
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import iframeData from "@/utils/IframeData";
import useTagsViewStore from "@/store/modules/tagsView";
const router = useRouter();
const iframeDataClass = new iframeData();
const iframeList = [] || iframeDataClass.getIframeList();
iframeList.unshift(
  {
    path: `/g-back/index`,
    meta: {
      title: "首页",
    },
    name: "index",
  },
  {
    path: `/s-back`,
    meta: {
      title: "系统管理",
    },
    name: "system-app",
  }
);
const openMenu = (item: {}) => {
  // console.log(item)
  if (item.meta.link) {
    useTagsViewStore().addIframeView(item);
  }
  router.push(item.path);
};
</script>

<style>
.el-menu {
  border-right: 0;
}
</style>
