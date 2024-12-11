import { useEffect } from 'react';
import './App.css';
import useGeolocation from './hooks/useGeoLocation';
import useWeather from './hooks/useWeather';

function App() {
  const {
    geolocation,
    loading: geolocationLoading,
    error: geolocationError,
  } = useGeolocation();
  const {
    fetchWeather,
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();

  useEffect(() => {
    if (geolocation) {
      fetchWeather(geolocation);
    }
  }, [geolocation, fetchWeather]);

  if (geolocationLoading || weatherLoading) return <>Loading...</>;

  if (geolocationError) {
    return <p>Error getting location: {geolocationError}</p>;
  }

  if (weatherError) {
    return <p>Error fetching weather: {weatherError}</p>;
  }

  return (
    <div className="p-4 bg-blue-100 rounded">
      {weather ? (
        <>
          <h1 className="text-2xl font-bold">
            Weather in {weather.location.name}, {weather.location.region} (
            {weather.location.country})
          </h1>
          <p className="text-lg">Temperature: {weather.current.temp_c}°C</p>
          <p className="text-md">{weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt="Weather Icon"
            className="w-16 h-16"
          />
        </>
      ) : (
        <p>Unable to retrieve weather data.</p>
      )}
    </div>
  );
}

export default App;
