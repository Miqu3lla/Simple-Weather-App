const key = import.meta.env.VITE_WEATHER_KEY;

export async function getgeocodingData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`);
        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }
        const data = await response.json();
        return data
    }catch (error) {
    console.error('Error fetching geocoding data:', error);
}
}