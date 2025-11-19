import { useState } from 'react';

function MapPlaceholder({ onLocationSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to approximate coordinates (mock data for مدينة مسك)
    const lat = 24.7136 + (y / rect.height - 0.5) * 0.1;
    const lng = 46.6753 + (x / rect.width - 0.5) * 0.1;
    
    const location = {
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
      x,
      y,
    };
    
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        onClick={handleMapClick}
        className="relative w-full flex-1 min-h-[200px] rounded-xl shadow-lg cursor-crosshair overflow-hidden border-2"
        style={{ backgroundColor: 'rgba(49, 204, 242, 0.1)', borderColor: '#31ccf2' }}
      >
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute w-full h-px" style={{ top: `${i * 10}%`, backgroundColor: '#1A1A1A' }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute h-full w-px" style={{ left: `${i * 10}%`, backgroundColor: '#1A1A1A' }} />
          ))}
        </div>
        
        {/* Marker for selected location */}
        {selectedLocation && (
          <>
            <div
              className="absolute w-20 h-20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping-slow"
              style={{
                left: `${selectedLocation.x}px`,
                top: `${selectedLocation.y}px`,
                backgroundColor: 'rgba(242, 49, 107, 0.2)'
              }}
            />
            <div
              className="absolute w-12 h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping-slow"
              style={{
                left: `${selectedLocation.x}px`,
                top: `${selectedLocation.y}px`,
                backgroundColor: 'rgba(242, 49, 107, 0.3)',
                animationDelay: '0.5s'
              }}
            />
            <div
              className="absolute w-8 h-8 rounded-full border-3 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${selectedLocation.x}px`,
                top: `${selectedLocation.y}px`,
                  backgroundColor: '#f25731',
                borderWidth: '3px'
              }}
            >
              <div className="absolute inset-1 rounded-full bg-white/30"></div>
            </div>
          </>
        )}
        
        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#31ccf2' }}></div>
        
        {/* Instructions */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/98 backdrop-blur-md text-xs md:text-sm p-2 rounded-lg text-center shadow-xl border-2" style={{ color: '#1A1A1A', borderColor: 'rgba(49, 204, 242, 0.4)' }}>
          <span className="font-bold" style={{ color: '#31ccf2' }}>
            اضغط على الخريطة لاختيار وجهتك
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapPlaceholder;


