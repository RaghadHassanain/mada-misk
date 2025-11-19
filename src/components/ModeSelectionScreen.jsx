import { Target, Dumbbell, Map } from 'lucide-react';

function ModeSelectionScreen({ onSelectMode, onBack }) {
  return (
    <div className="h-screen w-screen bg-background bg-pattern p-3 md:p-4 flex items-center justify-center relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-10 left-5 w-48 h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(49, 204, 242, 0.05)' }}></div>
      <div className="absolute bottom-10 right-5 w-56 h-56 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 49, 107, 0.05)', animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 183, 49, 0.05)', animationDelay: '0.5s' }}></div>
      
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-6 md:gap-8 px-4 relative z-10">
        {/* Question */}
        <div className="text-center space-y-3 mb-4">
          <div className="flex items-center justify-center gap-3">
            <Target className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" style={{ color: '#31ccf2' }} />
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#31ccf2' }}>
              اختر مغامرتك
            </h2>
          </div>
          <div className="w-28 h-1 mx-auto rounded-full" style={{ backgroundColor: '#f25731' }}></div>
          <p className="text-lg md:text-xl font-semibold" style={{ color: '#f25731' }}>
            كيف تريد أن تبدأ رحلتك اليوم؟
          </p>
        </div>

        {/* Mode buttons - Horizontal layout */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl">
          <button
            onClick={() => onSelectMode('exercise')}
            className="p-6 md:p-8 text-white text-xl md:text-2xl font-bold rounded-3xl transition-all duration-300 active:scale-95 transform hover:scale-[1.02] button-modern relative overflow-hidden card-modern flex flex-col items-center justify-center gap-3 min-h-[180px]"
            style={{ backgroundColor: '#f25731', boxShadow: '0 16px 55px rgba(242, 87, 49, 0.35)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e04a28';
              e.currentTarget.style.boxShadow = '0 22px 65px rgba(242, 87, 49, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f25731';
              e.currentTarget.style.boxShadow = '0 16px 55px rgba(242, 87, 49, 0.35)';
            }}
          >
            <span className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <Dumbbell className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                <span>ممارسة الرياضة</span>
              </div>
              <p className="text-sm md:text-base font-normal opacity-95">
                احرق السعرات وبنّي قوتك!
              </p>
            </span>
          </button>

          <button
            onClick={() => onSelectMode('destination')}
            className="p-6 md:p-8 text-white text-xl md:text-2xl font-bold rounded-3xl transition-all duration-300 active:scale-95 transform hover:scale-[1.02] button-modern relative overflow-hidden card-modern flex flex-col items-center justify-center gap-3 min-h-[180px]"
            style={{ backgroundColor: '#31ccf2', boxShadow: '0 16px 55px rgba(49, 204, 242, 0.35)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#28b8e0';
              e.currentTarget.style.boxShadow = '0 22px 65px rgba(49, 204, 242, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#31ccf2';
              e.currentTarget.style.boxShadow = '0 16px 55px rgba(49, 204, 242, 0.35)';
            }}
          >
            <span className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <Map className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                <span>الانتقال إلى وجهة محددة</span>
              </div>
              <p className="text-sm md:text-base font-normal opacity-95">
                استكشف مدينة مسك بطريقتك!
              </p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeSelectionScreen;


