<script setup>
import {ref } from 'vue'
import { Icon } from '@iconify/vue'


const props = defineProps({
    WeatherIcon: String,
    WeatherName: String,
    WeatherValue: Number,
})
const icon = ref(props.WeatherIcon === 'line-md:water' ? 'text-blue-500' :
    props.weatherIcon === 'solar:eye-line-duotone' ?  'text-pink-400' :
    'text-purple-600');
const name = ref(props.WeatherName);
const value = ref(props.WeatherValue);


</script>

<template>
    <div class ="flex flex-col items-center gap-2 mb-2 border-gray shadow-md rounded-lg p-10 w-45 hover:scale-105 transition-transform ease-out md:w-50  lg:w-65 xl:w-80">
        <Icon :icon="props.WeatherIcon" :class="icon"  class="h-8 w-8 "/>
        <h1> {{ name }}</h1>
        <h1> {{ value }}
            {{ name == 'Humidity' ? '%' : 
            name == 'Visibility' ? ' km' 
            : ' km/h' }}</h1>
    </div>
</template>