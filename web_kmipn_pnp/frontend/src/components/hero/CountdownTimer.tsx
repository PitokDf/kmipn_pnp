'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2025-12-12').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days < 0 ? 0 : timeLeft.days },
    { label: 'Hours', value: timeLeft.hours < 0 ? 0 : timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes < 0 ? 0 : timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds < 0 ? 0 : timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:flex sm:space-x-4 md:space-x-8">
      {timeBlocks.map(({ label, value }) => (
        <motion.div
          key={label}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-full sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="mt-2 text-sm md:text-base font-medium text-white">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;