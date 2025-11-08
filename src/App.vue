<script setup>
import { ref } from 'vue';
import { getWeatherData } from '@/services/weatherAPI';
import { Icon } from '@iconify/vue'

const city = ref('Manila');
const data = ref(null);
const temp = ref(null);
const loading = ref(false);
const error = ref(null);
const cityName = ref('');
const weather = ref(null);


async function fetchWeather() {
  const q = city.value.trim();
  if (!q) return;
  loading.value = true;
  try {
    data.value = await getWeatherData(city.value);
    cityName.value = city.value.trim();
    temp.value = data.value.current.temp;
    temp.value = (temp.value - 273.15).toFixed(2);
    weather.value = data.value.current.weather[0].main;

  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
  }

  fetchWeather()
</script>

<template>
  <div class="text-center my-20 ">
    <h1 class="text-3xl font-semibold mb-4">Weather App</h1>
    <h1 class="text-gray-500"> Your daily weather companion</h1>
  </div>
  <div class="border-gray shadow-md rounded-xl p-6 w-50 mx-auto h-500 sm:w-75 md:w-150 lg:w-250">
    <form @submit.prevent="fetchWeather" class="flex items-center justify-center mt-5">
      <input type="text" v-model="city" placeholder="Search location" class="border-gray shadow-md rounded-lg w-50  h-10 md:w-100 lg:w-150" />
      <button type="submit" class="ml-2 p-1 bg-black text-white rounded-full h-10 w-10">
        <Icon icon="solar:magnifer-linear" class="text-white w-8 h-4" />
      </button>
    </form>
<h1 v-if ="error" class = "text-red-400 ml-1 sm: ml-15"> Error:{{ error.message }}</h1>
    <div class="text-center mt-15">
      <h1 class="text-xl font-semibold">{{ cityName }}</h1>
      <!-- icon + temp side-by-side -->
      <div class="mt-2 flex items-center justify-center gap-2">
        <Icon v-if="temp >= 30" icon="solar:sun-line-duotone" class="w-8 h-8" />
        <Icon v-else-if="temp >= 20 && temp < 30" icon="solar:cloud-sun-line-duotone" class="w-8 h-8"/>
        <Icon v-else-if="temp >= 10 && temp < 20" icon="solar:cloud-line-duotone" class="w-8 h-8" />
        <Icon v-else-if="temp >= 10 && temp <= 15" icon="solar:cloud-rain-broken" class="w-8 h-8" />
        <Icon v-else icon="solar:snowflake-line-duotone" class="w-8 h-8" />
        <span class="text-xl font-semibold">{{ temp }} °C</span>
      </div>
      <div class="mt-2 flex items-center justify-center gap-2">
        <h1 class="text-md font-semi">{{ weather }}</h1>
      </div>
    </div>
  </div>
</template>