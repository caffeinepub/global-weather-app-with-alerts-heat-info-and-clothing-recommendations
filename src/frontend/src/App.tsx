import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useWeatherData } from './hooks/useQueries';
import { CurrentConditions } from './features/weather/components/CurrentConditions';
import { ForecastPanel } from './features/weather/components/ForecastPanel';
import { AlertsPanel } from './features/weather/components/AlertsPanel';
import { WhatToWearPanel } from './features/weather/components/WhatToWearPanel';
import { HeatPanel } from './features/weather/components/HeatPanel';
import { LocationSearch } from './features/location/components/LocationSearch';
import { SiCaffeine } from 'react-icons/si';

interface SelectedLocation {
  name: string;
  lat: number;
  lon: number;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const { data: weatherData, isLoading, error } = useWeatherData(selectedLocation);

  const handleLocationSelect = (location: { name: string; lat: number; lon: number }) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/weather-logo.dim_512x512.png" 
              alt="Weather App Logo" 
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold tracking-tight">Global Weather</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Search Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationSearch onSelect={handleLocationSelect} />
              {selectedLocation && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Showing weather for: <strong className="text-foreground">{selectedLocation.name}</strong></span>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Weather Content */}
        {!selectedLocation && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Search for a location</h2>
            <p className="text-muted-foreground">Enter any city name worldwide to see weather conditions, alerts, and recommendations</p>
          </div>
        )}

        {selectedLocation && isLoading && (
          <div className="text-center py-16">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        )}

        {selectedLocation && error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">Failed to load weather data. Please try again.</p>
            </CardContent>
          </Card>
        )}

        {selectedLocation && weatherData && !isLoading && (
          <div className="space-y-6">
            {/* Alerts Section */}
            <AlertsPanel alerts={weatherData.alerts} />

            {/* Current Conditions & Heat Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CurrentConditions data={weatherData.current} location={selectedLocation.name} />
              </div>
              <div>
                <HeatPanel current={weatherData.current} daily={weatherData.daily} />
              </div>
            </div>

            {/* Forecast */}
            <ForecastPanel forecast={weatherData.daily} />

            {/* What to Wear */}
            <WhatToWearPanel weather={weatherData.current} daily={weatherData.daily} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} · Built with <SiCaffeine className="h-4 w-4 text-amber-600" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
