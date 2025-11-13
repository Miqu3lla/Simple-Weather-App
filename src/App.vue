<script setup>
import { ref, computed} from 'vue';
import { getWeatherData } from '@/services/weatherAPI';
import { Icon } from '@iconify/vue'
import WeatherStat from '@/components/weatherStat.vue';
import DailyForecast from '@/components/dailyForecast.vue';
//variables for api data
const city = ref('Manila');
const data = ref(null);
const temp = ref(null);
const loading = ref(false);
const error = ref(null);
const cityName = ref('');
const weather = ref(null);
const stateName = ref('');
const weatherHumidity = ref(null);
const weatherVisibility = ref(null);
const weatherWindSpeed = ref(null);
const day = ref([]);

//async function to fetch weather data
async function fetchWeather() {
  const q = city.value.trim();
  //if no input, return
  if (!q) return;
  loading.value = true;
  //try block to fetch data
  try {
    //get weather data from api and set the city value 
    data.value = await getWeatherData(q);
    //set cityName, temp, and weather values
    cityName.value = q;
    temp.value = data.value.weather.current.temp;
    weather.value = data.value.weather.current.feels_like;
    stateName.value = data.value.location.state
    weatherHumidity.value = data.value.weather.current.humidity;
    weatherVisibility.value = data.value.weather.current.visibility / 1000;
    weatherWindSpeed.value = data.value.weather.current.wind_speed;
    day.value = data.value.weather.daily.slice(0,8);
    //catch block to set error value
  } catch (err) {
    error.value = err;
    //finally block to set loading to false
  } finally {
    loading.value = false;
  }
  }
//dynamic computed property for temperature icon
  const tempIcon = computed(() => {
    const item = temp.value;
    return item >= 35 ? { icon: 'solar:temperature-hot-line-duotone', class: 'text-red-500' } : 
    item >= 30 ? { icon: 'solar:sun-line-duotone', class: 'text-yellow-500' } :
    item >= 20 ? { icon: 'solar:cloud-sun-line-duotone', class: 'text-purple-600' } :
    item >= 12 ? { icon: 'solar:cloud-line-duotone', class: 'text-pink-400' } :
    item >= 5 ? { icon: 'solar:cloud-rain-broken', class: 'text-gray-500' } :
    { icon: 'solar:snowflake-line-duotone', class: 'text-blue-500' };  // Added a default class for consistency
  });

const getDay = computed(() => {
 return day.value.map((days) => {
  const date = new Date(days.dt * 1000)
 return date.toLocaleDateString('en-us',{weekday: 'long'})
})}
 )
  fetchWeather()
</script>

<template>
  <h1 v-if="loading" class="text-center mt-95">Loading.. Please wait</h1>
  <div v-else>
    <div class="text-center my-20 ">
      <h1 class="text-3xl font-semibold mb-4">Weather App</h1>
      <h1 class="text-gray-500"> Your daily weather companion</h1>
    </div>
    <div class="border-gray shadow-md rounded-xl p-6 w-80 mx-auto h-275 sm:w-75 md:w-135 lg:w-175 xl:w-300 xl:h-200">
      <form @submit.prevent="fetchWeather" class="flex items-center justify-center mt-5">
        <input type="text" v-model="city" placeholder="Search location" class="border-gray shadow-md rounded-lg w-50  h-10 md:w-100 lg:w-150" />
        <button type="submit" class="ml-2 p-1 bg-black text-white rounded-full h-10 w-10">
          <Icon icon="solar:magnifer-linear" class="text-white w-8 h-4" />
        </button>
      </form>
      <h1 v-if ="error" class = "text-red-400 ml-1 sm:ml-2 md:ml-15 lg:ml-40"> Error:{{ error.message }}</h1>
      <div class="text-center mt-38">
        <h1 class="text-xl font-semibold">{{ cityName}}, <span class="text-gray-400 text-sm">{{ stateName }}</span></h1>
        <!-- icon + temp side-by-side -->
        <div class="mt-2 flex items-center justify-center gap-4">
          <Icon :icon="tempIcon.icon" :class="tempIcon.class" class="w-16 h-16" />
          <span class="text-4xl font-bold">{{ temp }} °C</span>
        </div>
        <div class="mt-2 flex items-center justify-center gap-2">
          <h1 class="text-sm font-semi text-gray-400">feels like: {{ weather }}</h1>
        </div>
      </div>
      <div class = "mt-35 ml-8 grid grid-cols-1  gap-1 md:grid-cols-2 lg:grid-cols-2 lg:ml-15 lg:mr-8 xl:grid-cols-3">
        <WeatherStat
          WeatherIcon="line-md:water"
          WeatherName="Humidity"
          :WeatherValue ="weatherHumidity"
        />
        <WeatherStat
          WeatherIcon="solar:wind-line-duotone"
          WeatherName="Wind"
          :WeatherValue ="weatherWindSpeed"
        />
        <WeatherStat
          WeatherIcon="solar:eye-line-duotone"
          WeatherName="Visibility"
          :WeatherValue ="weatherVisibility"
        />
      </div>
    </div>
    <div class="flex ml-10 p-10 gap-3 " >
      <DailyForecast
      :day = 'getDay[0]'
       :icon="day[0].temp.day"
       :Temp='day[0].temp.day'
      />
      <DailyForecast
      :day = 'getDay[1]'
       :icon="day[1].temp.day"
       :Temp='day[1].temp.day'
      />
      <DailyForecast
      :day = 'getDay[2]'
       :icon="day[2].temp.day"
       :Temp='day[2].temp.day'
      />
          <DailyForecast
      :day="getDay[4]"
      :Temp="day[4].temp.day"
    />
    <DailyForecast
      :day="getDay[5]"
      :Temp="day[5].temp.day"
    />
    <DailyForecast
      :day="getDay[6]"
      :Temp="day[6].temp.day"
    />
    <DailyForecast
      :day="getDay[7]"
      :Temp="day[7].temp.day"
    />
        <DailyForecast
      :day="getDay[4]"
      :Temp="day[4].temp.day"
    />
    <DailyForecast
      :day="getDay[5]"
      :Temp="day[5].temp.day"
    />
    <DailyForecast
      :day="getDay[6]"
      :Temp="day[6].temp.day"
    />
    <DailyForecast
      :day="getDay[7]"
      :Temp="day[7].temp.day"
    />
    
    </div>
  </div>
</template>