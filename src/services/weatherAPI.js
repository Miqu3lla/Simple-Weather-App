const key = import.meta.env.VITE_WEATHER_KEY;

export async function getWeatherData(city) {
    try {
        if (!key) throw new Error('API key is missing');
    const geo = await fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
    if (!geo.ok) {
        throw new Error('Failed to fetch geocoding data');
    }
    const geoData = await geo.json();
    if (!geoData.length) {
        throw new Error('No geocoding data found for the specified city');
    }
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

        if (!key ) throw new Error('API key is missing');
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        if (!data.timezone) {
            throw new Error('No weather data found for the specified location');
        }
        console.log(data);
        
        return data;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
