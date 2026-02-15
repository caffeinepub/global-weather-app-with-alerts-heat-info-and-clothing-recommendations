import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CurrentWeather, DailyForecast } from '../types';
import { getHeatRiskInfo } from '../recommendations/heatRisk';
import { getHeatRiskColor, getHeatRiskBgColor } from '../heat/thresholds';
import { Flame, TrendingUp, AlertTriangle } from 'lucide-react';

interface HeatPanelProps {
  current: CurrentWeather;
  daily: DailyForecast;
}

export function HeatPanel({ current, daily }: HeatPanelProps) {
  const todayHigh = daily.temperatureMax[0];
  const heatInfo = getHeatRiskInfo(current.temperature, current.feelsLike);
  const isHighRisk = heatInfo.level === 'high' || heatInfo.level === 'extreme';

  return (
    <Card className={`h-full ${isHighRisk ? getHeatRiskBgColor(heatInfo.level) : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className={`h-5 w-5 ${getHeatRiskColor(heatInfo.level)}`} />
          Heat Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current Temperature</p>
          <p className="text-3xl font-bold">{Math.round(current.temperature)}°C</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Feels Like</p>
          <p className="text-2xl font-semibold">{Math.round(current.feelsLike)}°C</p>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Today's High</p>
            <p className="text-xl font-semibold">{Math.round(todayHigh)}°C</p>
          </div>
        </div>

        <div className="pt-2">
          <Badge variant={isHighRisk ? 'destructive' : 'secondary'} className="mb-3">
            {heatInfo.label}
          </Badge>
          
          {isHighRisk && (
            <Alert variant="destructive" className="mt-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {heatInfo.guidance.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {!isHighRisk && heatInfo.guidance.length > 0 && (
            <div className="text-sm text-muted-foreground space-y-1">
              {heatInfo.guidance.map((tip, index) => (
                <p key={index}>• {tip}</p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
