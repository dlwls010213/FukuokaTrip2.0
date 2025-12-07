import React, { useState } from 'react';
import { ITINERARY_DATA } from '../constants';
import WeatherWidget from '../components/WeatherWidget';
import { MapPin, Info, Train, Gem } from 'lucide-react';

const Itinerary: React.FC = () => {
  // Default to the first day or closest date logic could go here
  const [activeTab, setActiveTab] = useState<string>(ITINERARY_DATA[0].date);

  const activeDay = ITINERARY_DATA.find(d => d.date === activeTab);

  return (
    <div>
      <WeatherWidget />

      {/* Tabs */}
      <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl mb-6 relative z-10 border border-white/20">
        {ITINERARY_DATA.map((day) => (
          <button
            key={day.date}
            onClick={() => setActiveTab(day.date)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
              activeTab === day.date
                ? 'bg-white text-[#234787] shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block text-xs font-normal opacity-80">{day.weekday}</span>
            {day.displayDate}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4 relative z-10">
        {activeDay?.items.map((item, index) => {
          // Special Styling for SEVENTEEN Concert
          if (item.isSpecial) {
            return (
              <div 
                key={index} 
                className="rounded-2xl p-0.5 shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                style={{
                    background: 'linear-gradient(135deg, #F7CAC9 0%, #92A8D1 100%)'
                }}
              >
                <div className="bg-white/20 backdrop-blur-md rounded-[14px] p-6 text-white border border-white/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Gem className="w-5 h-5 animate-pulse" />
                    <span className="font-bold text-xs tracking-widest uppercase">Main Event</span>
                  </div>
                  <h3 className="text-xl font-black mb-3 leading-tight drop-shadow-sm">{item.activity}</h3>
                  
                  <div className="flex items-start gap-3 text-sm font-medium bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white">{item.locationCN}</div>
                      <div className="text-white/80 text-xs">{item.locationJP}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Standard Card (Updated for transparency and white text)
          return (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 border-l-4 border-l-blue-300">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-blue-200 font-bold text-lg drop-shadow-sm">{item.time}</span>
                {item.transport && (
                  <span className="text-[10px] bg-white/20 border border-white/30 text-white px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                    <Train size={10} />
                    {item.transport}
                  </span>
                )}
              </div>
              
              <h3 className="text-white font-bold mb-2 text-lg drop-shadow-md">{item.activity}</h3>
              
              <div className="flex items-start gap-2 mb-2 text-white/90 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-blue-300" />
                <div>
                  <div className="font-medium tracking-wide">{item.locationCN}</div>
                  <div className="text-xs text-white/60">{item.locationJP}</div>
                </div>
              </div>

              {item.note && (
                <div className="mt-3 text-xs bg-yellow-400/20 border border-yellow-200/30 text-yellow-100 p-2 rounded flex items-start gap-2">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-yellow-300" />
                  {item.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;