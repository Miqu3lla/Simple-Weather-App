const key = import.meta.env.VITE_WEATHER_KEY;
const lat = '14.59948914';
const lon = '120.9782618'
export async function getWeatherData(city) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        console.log(data);
        
        return data;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}