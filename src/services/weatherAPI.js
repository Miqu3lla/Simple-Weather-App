const key = import.meta.env.VITE_WEATHER_KEY;

export async function getWeatherData(city) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}