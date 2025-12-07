import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

const Currency: React.FC = () => {
  const [jpy, setJpy] = useState<string>('');
  const [twd, setTwd] = useState<string>('');
  const [rate, setRate] = useState<number>(0.215); // Default fallback
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch real-time exchange rate
  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?amount=1&from=JPY&to=TWD')
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.TWD) {
          setRate(data.rates.TWD);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch rate:', err);
        setLoading(false);
      });
  }, []);

  const handleJpyChange = (val: string) => {
    setJpy(val);
    if (val === '') {
      setTwd('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setTwd((num * rate).toFixed(1));
    } else {
      setTwd('');
    }
  };

  const handleTwdChange = (val: string) => {
    setTwd(val);
    if (val === '') {
      setJpy('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setJpy((num / rate).toFixed(0));
    } else {
      setJpy('');
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[70vh] relative z-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">匯率換算</h2>
        {loading && <p className="text-blue-200 text-xs mt-2 animate-pulse">更新匯率中...</p>}
      </div>
      
      {/* Glass Container - Transparent Background */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
        <div className="space-y-6">
          
          {/* JPY Input */}
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2 ml-1">日幣 (JPY) ¥</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={jpy}
                onChange={(e) => handleJpyChange(e.target.value)}
                placeholder="0"
                className="block w-full p-4 text-2xl font-bold text-white bg-black/20 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-400 focus:bg-black/30 outline-none transition-all placeholder-white/30"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold pointer-events-none">JPY</span>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex justify-center -my-3 z-10 relative">
            <div className="bg-blue-600 p-2 rounded-full border border-white/20 text-white">
              <ArrowUpDown className="w-6 h-6" />
            </div>
          </div>

          {/* TWD Input */}
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2 ml-1">台幣 (TWD) NT$</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={twd}
                onChange={(e) => handleTwdChange(e.target.value)}
                placeholder="0"
                className="block w-full p-4 text-2xl font-bold text-white bg-black/20 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-400 focus:bg-black/30 outline-none transition-all placeholder-white/30"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold pointer-events-none">TWD</span>
            </div>
          </div>

        </div>
        
        <p className="text-xs text-center text-blue-200 mt-6 opacity-70">
          *即時匯率: 1 JPY ≈ {rate} TWD
        </p>
      </div>
    </div>
  );
};

export default Currency;