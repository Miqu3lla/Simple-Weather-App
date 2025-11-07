<script setup>
import { onMounted, ref } from 'vue';
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    return
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
  })

</script>

<template>
    <div v-if="loading" class = "flex items-center justify-center min-h-screen">
        <h1 class = "Text-lg">loading...</h1>
    </div>
    <div v-if="error" class = "flex items-center justify-center">
        <div class="Text-lg ">Error: {{ error.message }}</div>
    </div>
</template>