<script setup>
import { onMounted, ref } from 'vue';
import { getWeatherData } from '@/services/weatherAPI';
import Errors from '@/views/errors.vue';

const city = ref('');
const weather = ref(null);
const temp = ref(null);
const loading = ref(false);
const error = ref(null);
async function fetchWeather() {
  const q = city.value.trim();
  if (!q) return;
  loading.value = true;
  try {
    weather.value = await getWeatherData(city.value);
    temp.value = weather.value.current.temp;
    temp.value = (temp.value - 273.15).toFixed(2);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
  }

  fetchWeather()
</script>

<template>
    <Errors></Errors>
    <div>
      <form @submit.prevent="fetchWeather">

        <input type="text" v-model="city" placeholder="Enter city name" class = "border"/>
        <button type="submit" class="ml-2 p-1 bg-blue-500 text-white rounded">Get Weather</button>
      </form>
    </div>
    <div>
    </div>
</template>