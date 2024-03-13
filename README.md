This is a Weather App built with NextJS 14.x. It fetches real time weather data from [OpenWeatherMap's API](https://openweathermap.org/api) and uses [Google's Place Autocomplete API](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) to assist with searching.

Note: I have limited requests to the OpenWeatherMap API to 1000 requests a day due to cost. Please message me if it isn't working.

## Core Features

- Search for real time weather data of a city. See the current weather and time, as well as a 7 day forecast.
- Favorite / Unfavorite up to 4 cities for a quick glimpse of their weather and time.
- Light and Dark Theme
- Celsius/Fahrenheit toggle
- Mobile Responsive

## API Keys Required

- [One Call API 3.0 Key](https://openweathermap.org/api/one-call-3) from Open Weather Map
- [Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the following services enabled: Geocoding API, Maps JavaScript API, Places API

## Running the App Locally

Follow these steps to run the app on your local machine:

1. **Clone the repository**

   Use the following command to clone the repository to your local machine:

   ```bash
   git clone git@github.com:chrishson/weather-app.git
   ```

2. Ensure you are using `Node 21.x` or greater

3. Install the dependencies

   ```bash
   npm install
   ```

4. Setup environment variables

   Rename the `.env.example` file in the root directory to `.env.local`.

   Open `.env.local` and replace the placeholder values with your actual keys.

5. Start the development server

   ```bash
   npm run dev
   ```

6. Access the app
   Open your web browser and navigate to http://localhost:3000 to see the Weather App running locally.
