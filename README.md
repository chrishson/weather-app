This is a Weather App built with NextJS 14.x. It fetches real time weather data from [OpenWeatherMap's API](https://openweathermap.org/api) and uses [Google's Place Autocomplete API](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) to assist with searching.

Note: I have limited requests to the OpenWeatherMap API to 1000 requests a day due to cost. Please message me if it isn't working.

## Core Features

- Search for real time weather data of a city. See the current weather and time, as well as a 7 day forecast.
- Favorite / Unfavorite up to 4 cities for a quick glimpse of their weather and time.
- Light and Dark Theme
- Celsius/Fahrenheit toggle
- Mobile Responsive
<img width="1512" alt="Screenshot 2024-03-13 at 2 53 38 PM" src="https://github.com/chrishson/weather-app/assets/17053400/1d9135f9-6a36-42e3-9643-b6f7776fb2c5">
<img width="1512" alt="Screenshot 2024-03-13 at 2 54 09 PM" src="https://github.com/chrishson/weather-app/assets/17053400/0b489861-17f0-4bc4-a4c3-22ba5dd1ef0e">

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
