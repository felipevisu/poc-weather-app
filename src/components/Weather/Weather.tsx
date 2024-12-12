import { WeatherData } from '../../hooks/useWeather';
import { Current } from './Current';
import { Forecast } from './Forecast';

interface WeatherProps {
  weather: WeatherData;
}

export const Weather = ({ weather }: WeatherProps) => {
  return (
    <div className="p-4 bg-blue-100 rounded">
      <h1 className="text-2xl font-bold">
        Weather in {weather.location.name}, {weather.location.region} (
        {weather.location.country})
      </h1>
      <Current weather={weather.current} />
      <Forecast days={weather.forecast.forecastday} />
    </div>
  );
};

export default Weather;
