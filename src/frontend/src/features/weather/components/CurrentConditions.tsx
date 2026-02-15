import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CurrentWeather } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../icons/conditionIcons';
import { Droplets, Wind, Gauge } from 'lucide-react';

interface CurrentConditionsProps {
  data: CurrentWeather;
  location: string;
}

export function CurrentConditions({ data, location }: CurrentConditionsProps) {
  const icon = getWeatherIcon(data.weatherCode);
  const description = getWeatherDescription(data.weatherCode);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Current Conditions</CardTitle>
        <p className="text-sm text-muted-foreground">{location}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          <img src={icon} alt={description} className="h-24 w-24" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold">{Math.round(data.temperature)}°</span>
              <span className="text-2xl text-muted-foreground">C</span>
            </div>
            <Badge variant="secondary" className="mb-3">
              {description}
            </Badge>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Feels like</p>
                  <p className="font-semibold">{Math.round(data.feelsLike)}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{data.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="font-semibold">{Math.round(data.windSpeed)} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Precipitation</p>
                  <p className="font-semibold">{data.precipitation} mm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
