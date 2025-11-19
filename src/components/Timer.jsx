import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Rocket, PartyPopper, Trophy, Sparkles } from 'lucide-react';

function Timer({ mode = 'up', initialSeconds = 0, showControls = true, label = '', labelIcon = null }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = mode === 'up' ? prev + 1 : prev - 1;
          
          // Stop countdown at 0
          if (mode === 'down' && newSeconds <= 0) {
            setIsRunning(false);
            return 0;
          }
          
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(Math.abs(totalSeconds) / 60);
    const secs = Math.abs(totalSeconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isComplete = mode === 'down' && seconds === 0;
  
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      {label && (
        <div className="flex items-center gap-2">
          {labelIcon || null}
          <p className="text-lg md:text-xl font-bold" style={{ color: '#1A1A1A', lineHeight: '1.4' }}>
            {label}
          </p>
        </div>
      )}
      <div className={`text-5xl md:text-6xl font-bold font-mono transition-all duration-300 ${
        isComplete 
          ? 'animate-pulse' 
          : ''
      }`} style={{ 
        color: isComplete ? '#f25731' : isRunning ? '#31ccf2' : '#1A1A1A',
        textShadow: isRunning ? '0 0 30px rgba(49, 204, 242, 0.3)' : 'none',
        lineHeight: '1.2'
      }}>
        {formatTime(seconds)}
      </div>
      {isComplete && (
        <div className="text-center space-y-2 pt-2">
          <div className="flex items-center justify-center gap-2">
            <PartyPopper className="w-6 h-6 flex-shrink-0" style={{ color: '#f25731' }} />
            <p className="text-xl md:text-2xl font-bold animate-bounce" style={{ color: '#f25731', lineHeight: '1.4' }}>
              مبروك! أكملت التمرين!
            </p>
            <PartyPopper className="w-6 h-6 flex-shrink-0" style={{ color: '#f25731' }} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 flex-shrink-0" style={{ color: '#f2b731' }} />
            <p className="text-base md:text-lg font-semibold" style={{ color: '#f2b731', lineHeight: '1.5' }}>
              أنت بطل!
            </p>
            <Sparkles className="w-5 h-5 flex-shrink-0" style={{ color: '#f2b731' }} />
          </div>
        </div>
      )}
      {showControls && (
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center pt-2">
          {!isRunning && seconds !== (mode === 'down' ? 0 : initialSeconds) && (
            <button
              onClick={resume}
              className="px-5 py-2.5 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95 font-bold transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
              style={{ backgroundColor: '#31ccf2', boxShadow: '0 8px 25px rgba(49, 204, 242, 0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#28b8e0';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(49, 204, 242, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#31ccf2';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(49, 204, 242, 0.4)';
              }}
            >
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              <span>استئناف</span>
            </button>
          )}
          {!isRunning && seconds === (mode === 'down' ? initialSeconds : 0) && (
            <button
              onClick={start}
              className="px-5 py-2.5 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95 font-bold transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
              style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e04a28';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(242, 87, 49, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f25731';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(242, 87, 49, 0.4)';
              }}
            >
              <Rocket className="w-4 h-4 md:w-5 md:h-5" />
              <span>ابدأ</span>
            </button>
          )}
          {isRunning && (
            <button
              onClick={pause}
              className="px-5 py-2.5 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95 font-bold transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
              style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e04a28';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(242, 87, 49, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f25731';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(242, 87, 49, 0.4)';
              }}
            >
              <Pause className="w-4 h-4 md:w-5 md:h-5" />
              <span>إيقاف مؤقت</span>
            </button>
          )}
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 font-bold flex items-center gap-2 text-sm md:text-base"
            style={{ backgroundColor: '#F5F5F5', color: '#1A1A1A' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E5E5E5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <RotateCw className="w-4 h-4 md:w-5 md:h-5" />
            <span>إعادة تعيين</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Timer;

