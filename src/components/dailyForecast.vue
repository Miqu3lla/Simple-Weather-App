<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
const props = defineProps({
    day: String,
    icon: String,
    Temp: Number,
    feels: Number,
})

const day = ref(props.day)
const Temp = ref(props.Temp >= 35 ? 'icon-park:temperature-hot' : 
    props.Temp >= 30 ? 'solar:sun-line-duotone' :
    props.Temp >= 20 ? 'solar:cloud-sun-line-duotone' :
    props.Temp >= 12 ? 'solar:cloud-line-duotone' :
    props.Temp >= 5 ? 'solar:cloud-rain-broken' :
    'solar:snowflake-line-duotone');
const feels = ref(props.feels)

</script>

<template>
    <div class = 'flex flex-col items-center border-gray rounded-lg p-4 w-24 md:w-28 lg:w-32 xl:w-36 gap-2 shadow-md'>
        <h1 class = 'flex-1 text-center font-medium text-lg'>{{ day }}</h1>
        <Icon :icon = 'Temp' class = 'flex-1 h-10 w-10 text-purple-600'/>
        <h1 class = 'flex-1 text-center font-medium text-lg'>{{ props.Temp }}°C</h1>
    </div>
</template>