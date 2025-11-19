import { Bike, Sparkles, Target } from 'lucide-react';

function WelcomeScreen({ onStart }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-3 md:p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-10 left-5 w-48 h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(49, 204, 242, 0.05)' }}></div>
      <div className="absolute bottom-10 right-5 w-56 h-56 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 49, 107, 0.05)', animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 183, 49, 0.05)', animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-8 md:gap-12 animate-fade-in relative z-10 px-4 h-full">
        {/* Top - Logo and App name */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center relative animate-glow" style={{ backgroundColor: '#31ccf2', boxShadow: '0 0 40px rgba(49, 204, 242, 0.4)' }}>
            <div className="w-18 h-18 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center relative z-10 shadow-xl">
              <Bike className="w-10 h-10 md:w-12 md:h-12" style={{ color: '#31ccf2' }} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#31ccf2', textShadow: '0 2px 15px rgba(49, 204, 242, 0.25)' }}>
            مدى مسك
          </h1>
        </div>

        {/* Bottom - Welcome message and button */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-3">
            <p className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2" style={{ color: '#1A1A1A' }}>
              <Bike className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" style={{ color: '#31ccf2' }} />
              <span>ابدأ رحلتك الآن!</span>
            </p>
            <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: '#f25731' }}></div>
            <p className="text-lg md:text-xl font-semibold" style={{ color: '#f25731' }}>
              رفيقك الذكي لاستكشاف مدينة مسك
            </p>
          </div>
          
          <button
            onClick={onStart}
            className="px-12 py-6 text-white text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 active:scale-95 transform hover:scale-105 flex items-center justify-center gap-3 button-modern relative overflow-hidden min-w-[280px]"
            style={{ backgroundColor: '#f25731', boxShadow: '0 12px 45px rgba(242, 87, 49, 0.4)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e04a28';
              e.currentTarget.style.boxShadow = '0 18px 55px rgba(242, 87, 49, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f25731';
              e.currentTarget.style.boxShadow = '0 12px 45px rgba(242, 87, 49, 0.4)';
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Target className="w-6 h-6" />
              ابدأ المغامرة الآن
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;


