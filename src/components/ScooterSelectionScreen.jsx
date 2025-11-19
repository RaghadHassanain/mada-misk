import { useState, useEffect, useRef } from 'react';
import { Bike, Battery, MapPin, QrCode, CreditCard, CheckCircle, Search, Clock, StopCircle, Receipt } from 'lucide-react';

// Mock scooters data - Misk City coordinates
const MOCK_SCOOTERS = [
  { id: 1, name: 'دراجة A', lat: 24.7136, lng: 46.6753, battery: 85 },
  { id: 2, name: 'دراجة B', lat: 24.7140, lng: 46.6758, battery: 60 },
  { id: 3, name: 'دراجة C', lat: 24.7132, lng: 46.6748, battery: 40 },
  { id: 4, name: 'دراجة D', lat: 24.7145, lng: 46.6760, battery: 95 },
  { id: 5, name: 'دراجة E', lat: 24.7128, lng: 46.6745, battery: 70 },
];

const MAP_CENTER = { lat: 24.7136, lng: 46.6753 }; // Misk City center

// Pricing constants
const INITIAL_FEE = 5; // ريال - رسوم بدء التشغيل
const FREE_MINUTES = 5; // دقائق مجانية
const MINUTE_RATE = 1; // ريال لكل دقيقة بعد 5 دقائق

function ScooterSelectionScreen({ onComplete, onGoToMode }) {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [step, setStep] = useState('welcome'); // 'welcome', 'select', 'qr', 'payment', 'riding', 'endRide', 'receipt'
  const [rideStartTime, setRideStartTime] = useState(null);
  const [rideDuration, setRideDuration] = useState(0); // in seconds
  const [isRideActive, setIsRideActive] = useState(false);

  const handleScooterClick = (scooter) => {
    setSelectedScooter(scooter);
  };

  const handleConfirmSelection = () => {
    if (selectedScooter) {
      setStep('qr');
      // Simulate QR scan after 2 seconds
      setTimeout(() => {
        setStep('payment');
      }, 2000);
    }
  };

  const handlePayment = () => {
    // Start the ride timer in background
    setRideStartTime(Date.now());
    setIsRideActive(true);
    // Go directly to mode selection
    if (onGoToMode) {
      onGoToMode();
    }
  };

  // Timer for ride duration
  useEffect(() => {
    let interval = null;
    if (isRideActive && rideStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - rideStartTime) / 1000);
        setRideDuration(elapsed);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRideActive, rideStartTime]);

  const handleEndRide = () => {
    setIsRideActive(false);
    setStep('endRide');
  };

  const handleConfirmEndRide = () => {
    setStep('receipt');
  };

  const calculateRideCost = () => {
    const minutes = Math.ceil(rideDuration / 60);
    const extraMinutes = Math.max(0, minutes - FREE_MINUTES);
    const extraCost = extraMinutes * MINUTE_RATE;
    const totalCost = INITIAL_FEE + extraCost;
    return {
      initialFee: INITIAL_FEE,
      freeMinutes: FREE_MINUTES,
      usedMinutes: minutes,
      extraMinutes: extraMinutes,
      extraCost: extraCost,
      totalCost: totalCost
    };
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const getBatteryColor = (battery) => {
    if (battery >= 70) return '#10b981'; // green
    if (battery >= 40) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  // Welcome screen before map
  if (step === 'welcome') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-3 md:p-4 relative overflow-hidden" dir="rtl">
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
              مرحباً بك في مدى مسك
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
              onClick={() => setStep('select')}
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
                <Search className="w-6 h-6" />
                ابحث عن أقرب دراجة
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'qr') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-4" dir="rtl">
        <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-32 h-32 rounded-2xl bg-white p-6 shadow-2xl flex items-center justify-center">
            <QrCode className="w-full h-full" style={{ color: '#31ccf2' }} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#31ccf2' }}>
            امسح رمز QR
          </h2>
          <p className="text-lg text-center" style={{ color: '#1A1A1A' }}>
            يرجى مسح رمز QR الموجود على الدراجة
          </p>
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#31ccf2' }}></div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-4" dir="rtl">
        <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-32 h-32 rounded-2xl bg-white p-6 shadow-2xl flex items-center justify-center">
            <CreditCard className="w-full h-full" style={{ color: '#f25731' }} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#f25731' }}>
            تأكيد الدفع
          </h2>
          {selectedScooter && (
            <div className="w-full bg-white rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                  {selectedScooter.name}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-base" style={{ color: '#4A4A4A' }}>
                    رسوم بدء التشغيل
                  </span>
                  <span className="text-lg font-bold" style={{ color: '#31ccf2' }}>
                    {INITIAL_FEE} ريال
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base" style={{ color: '#10b981' }}>
                    ✓ {FREE_MINUTES} دقائق مجانية
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mt-2">
                  <p className="text-sm text-center" style={{ color: '#4A4A4A' }}>
                    بعد {FREE_MINUTES} دقائق: {MINUTE_RATE} ريال لكل دقيقة إضافية
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold" style={{ color: '#1A1A1A' }}>
                  المبلغ المطلوب الآن
                </span>
                <span className="text-2xl font-bold" style={{ color: '#f25731' }}>
                  {INITIAL_FEE} ريال
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full py-4 text-white text-xl font-bold rounded-xl transition-all duration-300 active:scale-95"
                style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
              >
                تأكيد الدفع وبدء الرحلة
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Riding screen
  if (step === 'riding') {
    const minutes = Math.ceil(rideDuration / 60);
    const isFreeTime = minutes <= FREE_MINUTES;
    
    return (
      <div className="h-screen w-screen flex flex-col bg-background bg-pattern" dir="rtl">
        {/* Top Bar */}
        <div className="w-full bg-white shadow-md z-20 px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: '#31ccf2' }}>
              {selectedScooter?.name}
            </h2>
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5" style={{ color: getBatteryColor(selectedScooter?.battery || 0) }} />
              <span className="text-lg font-semibold" style={{ color: getBatteryColor(selectedScooter?.battery || 0) }}>
                {selectedScooter?.battery}%
              </span>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
          <div className="text-center space-y-4">
            <div className="text-7xl md:text-8xl font-bold font-mono" style={{ color: isFreeTime ? '#10b981' : '#31ccf2' }}>
              {formatTime(rideDuration)}
            </div>
            <div className="space-y-2">
              {isFreeTime ? (
                <p className="text-xl font-semibold" style={{ color: '#10b981' }}>
                  الوقت المجاني: {FREE_MINUTES - minutes} دقيقة متبقية
                </p>
              ) : (
                <p className="text-xl font-semibold" style={{ color: '#f25731' }}>
                  رسوم إضافية: {minutes - FREE_MINUTES} دقيقة × {MINUTE_RATE} ريال
                </p>
              )}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="w-full max-w-2xl h-64 rounded-2xl shadow-xl overflow-hidden" style={{ backgroundColor: 'rgba(49, 204, 242, 0.1)' }}>
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="w-16 h-16" style={{ color: '#31ccf2' }} />
            </div>
          </div>
        </div>

        {/* End Ride Button */}
        <div className="w-full bg-white shadow-2xl border-t-2 z-20 p-4" style={{ borderColor: '#31ccf2' }}>
          <button
            onClick={handleEndRide}
            className="w-full py-4 text-white text-xl font-bold rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
          >
            <StopCircle className="w-6 h-6" />
            إنهاء الرحلة
          </button>
        </div>
      </div>
    );
  }

  // End Ride Confirmation
  if (step === 'endRide') {
    const cost = calculateRideCost();
    const minutes = Math.ceil(rideDuration / 60);
    
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-4" dir="rtl">
        <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-32 h-32 rounded-2xl bg-white p-6 shadow-2xl flex items-center justify-center">
            <StopCircle className="w-full h-full" style={{ color: '#f25731' }} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#f25731' }}>
            إنهاء الرحلة
          </h2>
          <div className="w-full bg-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold font-mono" style={{ color: '#31ccf2' }}>
                {formatTime(rideDuration)}
              </p>
              <p className="text-base" style={{ color: '#4A4A4A' }}>
                مدة الرحلة: {minutes} دقيقة
              </p>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base" style={{ color: '#4A4A4A' }}>
                  رسوم بدء التشغيل
                </span>
                <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                  {cost.initialFee} ريال
                </span>
              </div>
              {cost.extraMinutes > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-base" style={{ color: '#4A4A4A' }}>
                    {cost.extraMinutes} دقيقة إضافية ({cost.extraMinutes} × {MINUTE_RATE})
                  </span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                    {cost.extraCost} ريال
                  </span>
                </div>
              )}
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold" style={{ color: '#1A1A1A' }}>
                  الإجمالي
                </span>
                <span className="text-2xl font-bold" style={{ color: '#f25731' }}>
                  {cost.totalCost} ريال
                </span>
              </div>
            </div>
            <button
              onClick={handleConfirmEndRide}
              className="w-full py-4 text-white text-xl font-bold rounded-xl transition-all duration-300 active:scale-95"
              style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
            >
              تأكيد وإنهاء الرحلة
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Final Receipt
  if (step === 'receipt') {
    const cost = calculateRideCost();
    const minutes = Math.ceil(rideDuration / 60);
    
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background bg-pattern p-4" dir="rtl">
        <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-32 h-32 rounded-full bg-white p-6 shadow-2xl flex items-center justify-center">
            <Receipt className="w-full h-full" style={{ color: '#10b981' }} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#10b981' }}>
            تم إنهاء الرحلة بنجاح!
          </h2>
          <div className="w-full bg-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="text-center space-y-2 pb-4 border-b-2" style={{ borderColor: '#31ccf2' }}>
              <p className="text-sm" style={{ color: '#4A4A4A' }}>
                {selectedScooter?.name}
              </p>
              <p className="text-2xl font-bold font-mono" style={{ color: '#31ccf2' }}>
                {formatTime(rideDuration)}
              </p>
              <p className="text-base" style={{ color: '#4A4A4A' }}>
                {minutes} دقيقة
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base" style={{ color: '#4A4A4A' }}>
                  رسوم بدء التشغيل
                </span>
                <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                  {cost.initialFee} ريال
                </span>
              </div>
              {cost.extraMinutes > 0 ? (
                <div className="flex justify-between items-center">
                  <span className="text-base" style={{ color: '#4A4A4A' }}>
                    {cost.extraMinutes} دقيقة إضافية
                  </span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                    {cost.extraCost} ريال
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-base" style={{ color: '#10b981' }}>
                    ✓ ضمن الوقت المجاني
                  </span>
                  <span className="text-base font-semibold" style={{ color: '#10b981' }}>
                    0 ريال
                  </span>
                </div>
              )}
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                  المبلغ الإجمالي
                </span>
                <span className="text-3xl font-bold" style={{ color: '#f25731' }}>
                  {cost.totalCost} ريال
                </span>
              </div>
            </div>
            <button
              onClick={onComplete}
              className="w-full py-4 text-white text-xl font-bold rounded-xl transition-all duration-300 active:scale-95 mt-4"
              style={{ backgroundColor: '#31ccf2', boxShadow: '0 8px 25px rgba(49, 204, 242, 0.4)' }}
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background" dir="rtl">
      {/* Top Bar */}
      <div className="w-full bg-white shadow-md z-20 px-4 py-4">
        <h1 className="text-2xl font-bold text-center" style={{ color: '#31ccf2' }}>
          اختر دراجة قريبة منك
        </h1>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <ScooterMap
          scooters={MOCK_SCOOTERS}
          selectedScooter={selectedScooter}
          onScooterClick={handleScooterClick}
          getBatteryColor={getBatteryColor}
        />
      </div>

      {/* Bottom Info Panel */}
      <div className="w-full bg-white shadow-2xl border-t-2 z-20" style={{ borderColor: '#31ccf2' }}>
        {selectedScooter ? (
          <div className="p-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bike className="w-6 h-6" style={{ color: '#31ccf2' }} />
                <span className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                  {selectedScooter.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5" style={{ color: getBatteryColor(selectedScooter.battery) }} />
                <span className="text-lg font-semibold" style={{ color: getBatteryColor(selectedScooter.battery) }}>
                  {selectedScooter.battery}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#4A4A4A' }}>
              <MapPin className="w-4 h-4" />
              <span>على بعد 150 متر من موقعك</span>
            </div>
            <button
              onClick={handleConfirmSelection}
              className="w-full py-4 text-white text-xl font-bold rounded-xl transition-all duration-300 active:scale-95"
              style={{ backgroundColor: '#f25731', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
            >
              تأكيد الاختيار
            </button>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-lg" style={{ color: '#4A4A4A' }}>
              اضغط على دراجة على الخريطة للاختيار
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Separate Map Component
function ScooterMap({ scooters, selectedScooter, onScooterClick, getBatteryColor }) {
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const mapRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        setMapDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full"
      style={{ backgroundColor: 'rgba(49, 204, 242, 0.1)' }}
    >
      {/* Grid pattern to simulate map */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{ top: `${(i * 100) / 15}%`, backgroundColor: '#1A1A1A' }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{ left: `${(i * 100) / 15}%`, backgroundColor: '#1A1A1A' }}
          />
        ))}
      </div>

      {/* Center indicator (user location) */}
      {mapDimensions.width > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: '#31ccf2' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white opacity-50 animate-ping-slow" style={{ borderColor: '#31ccf2' }}></div>
        </div>
      )}

      {/* Scooter markers */}
      {mapDimensions.width > 0 &&
        scooters.map((scooter) => {
          const { x, y } = latLngToPixelHelper(scooter.lat, scooter.lng, mapDimensions.width, mapDimensions.height);
          const isSelected = selectedScooter?.id === scooter.id;
          const batteryColor = getBatteryColor(scooter.battery);

          return (
            <div
              key={scooter.id}
              onClick={() => onScooterClick(scooter)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-all duration-300"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: isSelected ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
              }}
            >
              {/* Pulse animation for selected scooter */}
              {isSelected && (
                <>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full animate-ping-slow"
                    style={{ backgroundColor: 'rgba(49, 204, 242, 0.2)' }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full animate-ping-slow"
                    style={{ backgroundColor: 'rgba(49, 204, 242, 0.3)', animationDelay: '0.5s' }}
                  />
                </>
              )}

              {/* Scooter icon */}
              <div
                className="relative w-12 h-12 rounded-full border-3 border-white shadow-xl flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: isSelected ? '#31ccf2' : batteryColor,
                  borderWidth: '3px',
                }}
              >
                <Bike className="w-6 h-6 text-white" />
                {/* Battery indicator dot */}
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: batteryColor }}
                />
              </div>

              {/* Scooter name label */}
              <div
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg text-xs font-bold text-white shadow-lg"
                style={{
                  backgroundColor: isSelected ? '#31ccf2' : '#1A1A1A',
                  opacity: isSelected ? 1 : 0.8,
                }}
              >
                {scooter.name}
              </div>
            </div>
          );
        })}
    </div>
  );
}

// Helper function to convert lat/lng to pixel coordinates
function latLngToPixelHelper(lat, lng, mapWidth, mapHeight) {
  const latRange = 0.002;
  const lngRange = 0.002;

  const x = ((lng - (MAP_CENTER.lng - lngRange / 2)) / lngRange) * mapWidth;
  const y = ((lat - (MAP_CENTER.lat - latRange / 2)) / latRange) * mapHeight;

  return { x, y };
}

export default ScooterSelectionScreen;

