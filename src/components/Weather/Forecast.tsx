import { WeatherData } from '../../hooks/useWeather';

const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const parseDate = (date: string) => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDay();
  return DAY_NAMES[day];
};

export const Forecast = ({
  days,
}: {
  days: WeatherData['forecast']['forecastday'];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {days.map(({ date, day }) => (
        <div key={date} className="w-48 p-6 text-center bg-white rounded-lg">
          <p className="mb-2">
            <b>{parseDate(date)}</b>
            <br />
            <span className="text-sm font-semibold opacity-50">{date}</span>
          </p>
          <p>Max: {day.maxtemp_c}</p>
          <p>Min: {day.mintemp_c}</p>
          <img
            src={day.condition.icon}
            alt="Weather Icon"
            className="w-16 h-16 mx-auto"
          />
        </div>
      ))}
    </div>
  );
};
