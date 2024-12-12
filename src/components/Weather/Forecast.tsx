import { WeatherData } from '../../hooks/useWeather';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const parseDate = (date: string) => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDay();
  return DAY_NAMES[day + 1];
};

export const Forecast = ({
  days,
}: {
  days: WeatherData['forecast']['forecastday'];
}) => {
  return (
    <div className="bg-red-900">
      {days.map(({ date, day }) => (
        <div key={date}>
          <p>
            {parseDate(date)} - {date}
          </p>
          <p>Max: {day.maxtemp_c}</p>
          <p>Min: {day.mintemp_c}</p>
          <img
            src={day.condition.icon}
            alt="Weather Icon"
            className="w-16 h-16"
          />
        </div>
      ))}
    </div>
  );
};
