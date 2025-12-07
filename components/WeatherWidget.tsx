import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Clock } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [time, setTime] = useState<string>('');
  
  // Mock weather state (In real app, fetch from API)
  const weather = {
    temp: 8,
    condition: 'Cloudy', // Simplified for demo
    location: 'FUKUOKA, JAPAN'
  };

  const weatherDescriptions: Record<string, string> = {
    'Sunny': '晴朗',
    'Cloudy': '多雲',
    'Rain': '下雨',
    'Snow': '下雪'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Get Fukuoka time (Asia/Tokyo)
      const now = new Date();
      const fukuokaTime = now.toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setTime(fukuokaTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-8 h-8 text-yellow-300 drop-shadow-sm" />;
      case 'Rain': return <CloudRain className="w-8 h-8 text-blue-300 drop-shadow-sm" />;
      case 'Snow': return <Snowflake className="w-8 h-8 text-white drop-shadow-sm" />;
      default: return <Cloud className="w-8 h-8 text-gray-200 drop-shadow-sm" />;
    }
  };

  return (
    <div className="w-full mb-10 flex flex-col items-center justify-center relative z-10 pt-16">
      
      {/* Time Section (Centered) */}
      <div className="flex flex-col items-center mb-1 w-full text-white">
        <div className="text-7xl font-sans font-semibold tracking-normal drop-shadow-lg leading-none">
            {time || '--:--'}
        </div>
      </div>

      {/* Location Title (Moved below time, smaller) */}
      <div className="text-center mb-6">
        <h1 className="text-sm font-bold tracking-[0.3em] text-white/90 drop-shadow-md uppercase">
            {weather.location}
        </h1>
      </div>

      {/* Weather Section (Pill style) */}
      <div className="flex items-center gap-4 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.condition)}
            <span className="text-2xl font-bold">{weather.temp}°</span>
          </div>
          <div className="w-[1px] h-6 bg-white/30"></div>
          <span className="text-sm font-medium tracking-widest">
            {weatherDescriptions[weather.condition] || weather.condition}
          </span>
      </div>
    </div>
  );
};

export default WeatherWidget;