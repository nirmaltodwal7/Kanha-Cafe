'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onExpire: () => void;
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const fMinutes = Math.floor(seconds / 60);
  const fSeconds = seconds % 60;
  
  // Flash red when under 1 minute
  const isWarning = seconds < 60;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-bold shadow-sm border ${
        isWarning 
          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
          : 'bg-orange-50 text-orange-600 border-orange-200'
      }`}
    >
      <Clock size={16} />
      <span>{String(fMinutes).padStart(2, '0')}:{String(fSeconds).padStart(2, '0')}</span>
    </motion.div>
  );
}
