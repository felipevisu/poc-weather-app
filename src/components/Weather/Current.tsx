import { WeatherData } from '../../hooks/useWeather';

export const Current = ({ weather }: { weather: WeatherData['current'] }) => {
  return (
    <div>
      <p className="text-lg">Temperature: {weather.temp_c}°C</p>
      <p className="text-md">{weather.condition.text}</p>
      <img
        src={weather.condition.icon}
        alt="Weather Icon"
        className="w-16 h-16"
      />
    </div>
  );
};
