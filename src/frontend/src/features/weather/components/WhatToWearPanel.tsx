import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CurrentWeather, DailyForecast } from '../types';
import { generateClothingRecommendations } from '../recommendations/whatToWear';
import { Shirt } from 'lucide-react';

interface WhatToWearPanelProps {
  weather: CurrentWeather;
  daily: DailyForecast;
}

export function WhatToWearPanel({ weather, daily }: WhatToWearPanelProps) {
  const recommendations = generateClothingRecommendations(weather, daily);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shirt className="h-5 w-5" />
          What to Wear
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index}>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <span className="text-3xl">{rec.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.category}</h4>
                  <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                </div>
              </div>
              {index < recommendations.length - 1 && index % 3 === 2 && (
                <Separator className="my-4 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
