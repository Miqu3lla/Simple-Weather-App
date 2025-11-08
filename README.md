# Simple Weather App

A small Vue 3 + Vite app that shows current weather for a city, with a clean UI styled by Tailwind CSS and icons from Iconify. Data is fetched from OpenWeather (geocoding + One Call).

## Features
- City search with debounced geocoding (accurate city naming)
- Optional dropdown suggestions; pick a result to avoid wrong matches
- Current conditions via One Call (metric units: °C)
- Temperature icon changes based on the current Celsius value
- Loading and error states
- Lightweight UI using Tailwind CSS + Iconify

## Tech Stack
- Vue 3 (script setup) + Vite
- Tailwind CSS
- Iconify (`@iconify/vue`)
- OpenWeather APIs (Direct Geocoding + One Call 3.0)

## Setup

1) Install dependencies
```sh
npm install
```

2) Add your OpenWeather API key (client-exposed)
```sh
# .env.local (in project root)
VITE_WEATHER_KEY=your_openweather_api_key
```
Notes:
- Restart dev server after changing env files.
- VITE_ variables are embedded in the client bundle (not secret). Use a backend/proxy if you need to hide the key.

3) Run
```sh
npm run dev
```

4) Build
```sh
npm run build
```

## How it works (brief)
- Search flow: type a city name → app queries OpenWeather Direct Geocoding → choose a result → app calls One Call with the selected lat/lon.
- Units are requested as `metric`, so temperatures are already in °C (no Kelvin conversion needed).
- The UI selects an icon based on the current temperature thresholds (e.g., cold → snowflake, warm → sun).

## Notes
- OpenWeather rate limits apply; consider caching or a small server proxy for production.
- Tailwind utilities are used directly in templates; ensure the Tailwind stylesheet is imported in your main entry.
- Icons come from Iconify; you can switch sets by changing the icon name (e.g., `mdi:weather-sunny`).
