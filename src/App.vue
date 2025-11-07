<script setup>
import { onMounted, ref } from 'vue';
import { getWeatherData } from '@/services/weatherAPI';

const city = ref('Manila');
const weather = ref(null);
const temp = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    weather.value = await getWeatherData(city.value);
    temp.value = weather.value.main;
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
    <h1>{{ city }}</h1>
    <h1>{{ temp }}</h1>
</template>