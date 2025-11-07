<script setup>
import { onMounted, ref } from 'vue';
import { getWeatherData } from '@/services/weatherAPI';
import Errors from '@/views/errors.vue';

const city = ref('');
const weather = ref(null);
const temp = ref(null);
const loading = ref(false);
const error = ref(null);



onMounted(async () => {
  loading.value = true;
  try {
    weather.value = await getWeatherData(city.value);
    temp.value = weather.value.current.temp;
    const celsius = temp.value - 273.15;
    temp.value = celsius.toFixed(2);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
  })
</script>

<template>
    <Errors></Errors>
    <div>
       
    </div>
</template>