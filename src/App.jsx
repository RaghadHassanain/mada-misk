import { useState } from 'react';
import ScooterSelectionScreen from './components/ScooterSelectionScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import DestinationModeScreen from './components/DestinationModeScreen';
import ExerciseModeScreen from './components/ExerciseModeScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('scooterSelect');

  const handleStart = () => {
    setCurrentScreen('mode');
  };

  const handleSelectMode = (mode) => {
    setCurrentScreen(mode);
  };

  const handleBack = () => {
    setCurrentScreen('mode');
  };

  const handleScooterSelectionComplete = () => {
    setCurrentScreen('welcome');
  };

  const handleScooterSelectionToMode = () => {
    setCurrentScreen('mode');
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {currentScreen === 'scooterSelect' && (
        <ScooterSelectionScreen 
          onComplete={handleScooterSelectionComplete}
          onGoToMode={handleScooterSelectionToMode}
        />
      )}
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'mode' && (
        <ModeSelectionScreen
          onSelectMode={handleSelectMode}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}
      {currentScreen === 'destination' && (
        <DestinationModeScreen onBack={handleBack} />
      )}
      {currentScreen === 'exercise' && (
        <ExerciseModeScreen onBack={handleBack} />
      )}
      </div>
  );
}

export default App;
