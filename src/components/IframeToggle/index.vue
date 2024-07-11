<template>
    <inner-link
    v-for="(item, index) in uniqBy(iframeViews,'path')"
    :key="item.path"
    :iframeId="'iframe' + index"
    v-show="route.path === item.path"
    :src="iframeUrl(item.meta.link, item.query)"
  ></inner-link>
</template>

<script setup>
import InnerLink from "../InnerLink/index.vue";
import useTagsViewStore from "@/store/modules/tagsView";
import { uniqBy } from 'lodash'

const route = useRoute();
const tagsViewStore = useTagsViewStore();
const iframeViews = computed(()=>tagsViewStore.iframeViews)

// console.log(iframeViews.value)
function iframeUrl(url, query) {
  // if (Object.keys(query).length > 0) {
  //   let params = Object.keys(query).map((key) => key + "=" + query[key]).join("&");
  //   return url + "?" + params;
  // }
  return url;
}
</script>
