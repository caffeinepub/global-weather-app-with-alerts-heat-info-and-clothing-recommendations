import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DailyForecast } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../icons/conditionIcons';
import { Calendar } from 'lucide-react';

interface ForecastPanelProps {
  forecast: DailyForecast;
}

export function ForecastPanel({ forecast }: ForecastPanelProps) {
  const days = forecast.time.slice(0, 7);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          7-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {days.map((day, index) => {
            const icon = getWeatherIcon(forecast.weatherCode[index]);
            const description = getWeatherDescription(forecast.weatherCode[index]);
            
            return (
              <div
                key={day}
                className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <p className="text-sm font-medium mb-2">{formatDate(day)}</p>
                <img src={icon} alt={description} className="h-12 w-12 mb-2" />
                <p className="text-xs text-muted-foreground mb-2 text-center">{description}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{Math.round(forecast.temperatureMax[index])}°</span>
                  <span className="text-muted-foreground">{Math.round(forecast.temperatureMin[index])}°</span>
                </div>
                {forecast.precipitationProbability[index] > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {forecast.precipitationProbability[index]}% rain
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
