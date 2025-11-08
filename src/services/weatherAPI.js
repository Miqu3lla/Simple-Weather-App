const key = import.meta.env.VITE_WEATHER_KEY;
//async function to get weather data
export async function getWeatherData(city) {
    //try catch block to handle errors
    try {
        if (!key) throw new Error('API key is missing');
        //fetch geocoding data to get lat and lon
    const geo = await fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
    //if response is not ok, throw error
    if (!geo.ok) {
        throw new Error('Failed to fetch geocoding data');
    }
    //convert geo to json
    const geoData = await geo.json();
    console.log(geoData);
    //if no data found, throw error
    if (!geoData.length) {
        throw new Error('No geocoding data found for the specified city');
    }
    //get lat and lon from geoData
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    const location = geoData[0]
        //fetch weather data using lat and lon
        if (!key ) throw new Error('API key is missing');
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        //convert response to json
        const weather = await response.json();
        //if no data found, throw error
        if (!weather.timezone) {
            throw new Error('No weather data found for the specified location');
        }
        console.log(weather);
        
        return {weather, location};
    }
    //catch block to log errorrs
    catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`);
    }
}
