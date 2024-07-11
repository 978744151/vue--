<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const { params, query } = route
watch(route,()=>{
})
const { path } = params
router.replace({ path: '/' + path})
onMounted(() => {
 
})
</script>