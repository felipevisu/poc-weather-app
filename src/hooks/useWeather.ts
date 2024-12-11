import { useCallback, useState } from 'react';
import axios from 'axios';
import { Geolocation } from './useGeoLocation';

interface WeatherData {
  location: { name: string; region: string; country: string };
  current: {
    temp_c: number;
    temp_f: number;
    condition: { text: string; icon: string };
  };
}

interface UseWeatherReturn {
  fetchWeather: (geolocation: Geolocation) => Promise<void>;
  loading: boolean;
  error: string | null;
  weather: WeatherData | null;
}

const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(
    async (geolocation: Geolocation): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        console.log('aqui');
        const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
        console.log('aqui 2');

        if (!apiKey) {
          setError('API key is missing.');
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json`,
          {
            params: {
              key: apiKey,
              q: `${geolocation?.latitude},${geolocation?.longitude}`,
            },
          }
        );
        setWeather(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            'Failed to fetch weather data: ' +
              (err.response?.data?.error?.message || err.message)
          );
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchWeather, loading, error, weather };
};

export default useWeather;
