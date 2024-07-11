<template>
  <div v-loading="loading" :style="'height:' + height">
    <iframe :id="iframeId" style="width: 100%; height: 100%;padding:5px 10px;background:#fff;" :src="src"
      frameborder="no"></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "/"
  },
  iframeId: {
    type: String
  }
});
const loading = ref(true)
const height = ref(document.documentElement.clientHeight - 94.5 + "px;")

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
  window.onresize = function temp() {
    height.value = document.documentElement.clientHeight - 94.5 + "px;";
  };
})
</script>
