import React, { useEffect, useState } from 'react';

const SnowEffect: React.FC = () => {
  const [flakes, setFlakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate static number of flakes to prevent hydration mismatch issues or excessive re-renders
    const newFlakes = Array.from({ length: 30 }, (_, i) => i);
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {flakes.map((i) => {
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${Math.random() * 5 + 8}s`; // Slower fall: 8-13s
        const animationDelay = `${Math.random() * 5}s`;
        const size = `${Math.random() * 1.5 + 0.8}rem`; // Text size

        return (
          <div
            key={i}
            className="snowflake"
            style={{
              left,
              fontSize: size,
              animationDuration,
              animationDelay,
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
};

export default SnowEffect;