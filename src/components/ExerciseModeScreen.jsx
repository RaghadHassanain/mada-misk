import { useState } from 'react';
import { ArrowRight, Dumbbell, Sparkles, Flame, Zap, Rocket, Target, Timer as TimerIcon, RotateCw } from 'lucide-react';
import Timer from './Timer';

function ExerciseModeScreen({ onBack }) {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const durations = [90, 60, 30]; // in minutes

  const handleDurationSelect = (minutes) => {
    setSelectedDuration(minutes);
  };

  const handleReset = () => {
    setSelectedDuration(null);
  };

  return (
    <div className="h-screen w-screen bg-background bg-pattern p-3 md:p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-10 right-5 w-48 h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 87, 49, 0.05)' }}></div>
      <div className="absolute bottom-10 left-5 w-40 h-40 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 183, 49, 0.05)', animationDelay: '0.5s' }}></div>
      
      <div className="h-full w-full max-w-7xl mx-auto flex flex-col py-3 px-3 md:px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#31ccf2' }}>
            ممارسة الرياضة
          </h1>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 font-semibold flex items-center gap-2 shadow-sm text-sm"
            style={{ backgroundColor: '#F5F5F5', color: '#1A1A1A' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E5E5E5';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F5F5';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </button>
        </div>

        {/* Motivational phrase */}
        <div className="text-center space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2">
            <Dumbbell className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" style={{ color: '#f25731' }} />
            <p className="text-xl md:text-2xl font-bold" style={{ color: '#1A1A1A' }}>
              قوّي جسمك وبنّي صحتك!
            </p>
          </div>
          <div className="w-28 h-1 mx-auto rounded-full" style={{ backgroundColor: '#f25731' }}></div>
          <p className="text-base md:text-lg font-semibold" style={{ color: '#f25731' }}>
            اختر مدة التمرين
          </p>
        </div>

        {/* Duration selection */}
        {!selectedDuration && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
              {durations.map((duration) => {
                // نظام ألوان احترافي: أزرق للبداية، أصفر للمتوسط، برتقالي للتحدي
                let bgColor = '#31ccf2';
                let hoverColor = '#28b8e0';
                let iconColor = '#FFFFFF';
                
                if (duration === 90) {
                  bgColor = '#f25731';
                  hoverColor = '#e04a28';
                } else if (duration === 60) {
                  bgColor = '#f2b731';
                  hoverColor = '#e0a825';
                } else if (duration === 30) {
                  bgColor = '#31ccf2';
                  hoverColor = '#28b8e0';
                }
                
                return (
                  <button
                    key={duration}
                    onClick={() => handleDurationSelect(duration)}
                    className="p-4 md:p-6 text-white text-2xl md:text-3xl font-bold rounded-2xl transition-all duration-300 active:scale-95 transform hover:scale-[1.03] border-2 border-white/20 button-modern relative overflow-hidden card-modern flex flex-col items-center justify-center gap-2 min-h-[140px] md:min-h-[160px]"
                    style={{ 
                      backgroundColor: bgColor, 
                      boxShadow: `0 20px 50px ${bgColor}40`,
                      borderColor: 'rgba(255, 255, 255, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hoverColor;
                      e.currentTarget.style.boxShadow = `0 25px 60px ${bgColor}60`;
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-6px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = bgColor;
                      e.currentTarget.style.boxShadow = `0 20px 50px ${bgColor}40`;
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold leading-none">{duration}</span>
                      <span className="text-base md:text-lg font-semibold opacity-95">دقيقة</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-white/25 w-full">
                      {duration === 90 && (
                        <>
                          <Flame className="w-4 h-4" style={{ color: iconColor }} />
                          <span className="text-xs md:text-sm font-semibold opacity-95">تحدي كامل!</span>
                        </>
                      )}
                      {duration === 60 && (
                        <>
                          <Zap className="w-4 h-4" style={{ color: iconColor }} />
                          <span className="text-xs md:text-sm font-semibold opacity-95">تمرين قوي!</span>
                        </>
                      )}
                      {duration === 30 && (
                        <>
                          <Rocket className="w-4 h-4" style={{ color: iconColor }} />
                          <span className="text-xs md:text-sm font-semibold opacity-95">بداية رائعة!</span>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Timer display */}
        {selectedDuration && (
          <div className="flex-1 flex flex-col justify-center gap-4">
            {/* Selected duration info */}
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center border-2 card-modern shadow-[0_10px_40px_rgba(0,0,0,0.08)]" style={{ borderColor: 'rgba(49, 204, 242, 0.25)' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 flex-shrink-0" style={{ color: '#31ccf2' }} />
                <p className="text-base md:text-lg font-semibold" style={{ color: '#31ccf2' }}>
                  هدفك اليوم: {selectedDuration} دقيقة
                </p>
              </div>
              <p className="text-sm font-semibold" style={{ color: '#f25731' }}>
                أنت قادر على إكمالها!
              </p>
            </div>

            {/* Timer */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-2 card-modern" style={{ borderColor: 'rgba(49, 204, 242, 0.25)' }}>
              <Timer
                mode="down"
                initialSeconds={selectedDuration * 60}
                label="الوقت المتبقي:"
                labelIcon={<TimerIcon className="w-5 h-5 inline-block ml-2" style={{ color: '#31ccf2' }} />}
              />
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="px-6 py-3 text-base md:text-lg font-semibold rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#F5F5F5', color: '#1A1A1A' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E5E5E5';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F5F5F5';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
            >
              <RotateCw className="w-5 h-5" />
              <span>تغيير المدة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseModeScreen;


