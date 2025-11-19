import { useState } from 'react';
import { ArrowRight, Map, CheckCircle2, Target, Ruler, Timer as TimerIcon, Rocket, MapPin, Bike } from 'lucide-react';
import MapPlaceholder from './MapPlaceholder';
import Timer from './Timer';

function DestinationModeScreen({ onBack }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tripStarted, setTripStarted] = useState(false);
  const [distance, setDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [directions, setDirections] = useState([]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Simulate distance calculation (mock data)
    const mockDistance = (Math.random() * 10 + 2).toFixed(2); // 2-12 km
    const mockTime = Math.round(mockDistance * 4); // ~4 minutes per km
    
    setDistance(mockDistance);
    setEstimatedTime(mockTime);
    
    // Mock directions
    setDirections([
      'اتجه شمالاً على شارع الملك فهد',
      'استمر لمدة 500 متر',
      'انعطف يميناً عند إشارة المرور',
      'اتجه شرقاً على طريق العليا',
      'استمر لمدة 1.2 كيلومتر',
      'انعطف يساراً عند الدوار',
      'واصل السير حتى تصل إلى وجهتك',
    ]);
  };

  const handleStartTrip = () => {
    if (selectedLocation) {
      setTripStarted(true);
    }
  };

  return (
    <div className="h-screen w-screen bg-background bg-pattern p-3 md:p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-10 left-5 w-48 h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(49, 204, 242, 0.05)' }}></div>
      <div className="absolute bottom-10 right-5 w-40 h-40 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(242, 183, 49, 0.05)', animationDelay: '0.5s' }}></div>
      
      <div className="h-full w-full max-w-7xl mx-auto flex flex-col py-2 px-3 md:px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#31ccf2' }}>
            الانتقال إلى وجهة محددة
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

        {/* Description */}
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 flex-shrink-0" style={{ color: '#31ccf2' }} />
            <p className="text-base md:text-lg font-bold" style={{ color: '#1A1A1A' }}>
              استكشف مدينة مسك
            </p>
          </div>
          <p className="text-sm font-semibold" style={{ color: '#f25731' }}>
            اختر وجهتك وابدأ رحلة لا تُنسى!
          </p>
        </div>

        {/* Map and Info - Horizontal Layout */}
        <div className="flex-1 grid grid-cols-2 gap-3 md:gap-4 min-h-0">
          {/* Map */}
          <div className="bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] card-modern flex flex-col">
            <MapPlaceholder onLocationSelect={handleLocationSelect} />
          </div>

          {/* Selected destination info */}
          {selectedLocation && (
            <div className="bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] space-y-3 card-modern flex flex-col overflow-y-auto">
              <div className="pb-3 border-b" style={{ borderColor: 'rgba(49, 204, 242, 0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#31ccf2' }} />
                  <h3 className="text-base md:text-lg font-bold" style={{ color: '#1A1A1A' }}>
                    الوجهة المختارة
                  </h3>
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: '#f25731' }}>
                  جاهز للانطلاق!
                </p>
                <p className="text-xs" style={{ color: '#4A4A4A' }}>
                  {selectedLocation.lat}, {selectedLocation.lng}
                </p>
              </div>

              {/* Distance and time estimate */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 border-2 card-modern" style={{ backgroundColor: 'rgba(49, 204, 242, 0.1)', borderColor: 'rgba(49, 204, 242, 0.3)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 flex-shrink-0" style={{ color: '#31ccf2' }} />
                    <p className="text-xs font-semibold" style={{ color: '#31ccf2' }}>
                      المسافة
                    </p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{distance} كم</p>
                </div>
                <div className="rounded-xl p-3 border-2 card-modern" style={{ backgroundColor: 'rgba(49, 204, 242, 0.1)', borderColor: 'rgba(49, 204, 242, 0.3)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <TimerIcon className="w-4 h-4 flex-shrink-0" style={{ color: '#31ccf2' }} />
                    <p className="text-xs font-semibold" style={{ color: '#31ccf2' }}>
                      المدة
                    </p>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{estimatedTime} د</p>
                </div>
              </div>

              {/* Start trip button */}
              {!tripStarted && (
                <button
                  onClick={handleStartTrip}
                  className="w-full px-4 py-3 text-base md:text-lg font-bold rounded-xl transition-all duration-300 active:scale-95 transform hover:scale-105 flex items-center justify-center gap-2 button-modern relative overflow-hidden mt-auto"
                  style={{ backgroundColor: '#f25731', color: '#FFFFFF', boxShadow: '0 8px 25px rgba(242, 87, 49, 0.4)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e04a28';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(242, 87, 49, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f25731';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(242, 87, 49, 0.4)';
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    ابدأ الرحلة
                  </span>
                </button>
              )}

              {/* Timer */}
              {tripStarted && (
                <div className="bg-white rounded-xl p-4 border-2 card-modern mt-auto" style={{ borderColor: 'rgba(49, 204, 242, 0.25)' }}>
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Bike className="w-5 h-5 flex-shrink-0" style={{ color: '#31ccf2' }} />
                      <p className="text-base font-bold" style={{ color: '#31ccf2' }}>
                        رحلتك جارية!
                      </p>
                    </div>
                  </div>
                  <Timer mode="up" initialSeconds={0} label="وقت الرحلة:" labelIcon={<TimerIcon className="w-4 h-4 inline-block ml-2" />} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DestinationModeScreen;


