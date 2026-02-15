import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeatherAlert } from '../types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AlertsPanelProps {
  alerts: WeatherAlert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <Alert className="border-emerald-500/50 bg-emerald-500/10">
        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
        <AlertTitle className="text-emerald-900 dark:text-emerald-100">No Active Alerts</AlertTitle>
        <AlertDescription className="text-emerald-800 dark:text-emerald-200">
          There are currently no weather warnings or alerts for this location.
        </AlertDescription>
      </Alert>
    );
  }

  const getSeverityVariant = (severity: WeatherAlert['severity']): 'default' | 'destructive' => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return 'destructive';
      case 'moderate':
      case 'minor':
        return 'default';
    }
  };

  const getSeverityBadgeVariant = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return 'destructive';
      case 'moderate':
        return 'default';
      case 'minor':
        return 'secondary';
    }
  };

  return (
    <Card className="border-amber-500/50 bg-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <AlertTriangle className="h-5 w-5" />
          Active Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <Alert key={index} variant={getSeverityVariant(alert.severity)}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
              {alert.title}
              <Badge variant={getSeverityBadgeVariant(alert.severity)} className="ml-auto">
                {alert.severity.toUpperCase()}
              </Badge>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-2">{alert.description}</p>
              <p className="text-xs">
                <strong>Effective:</strong> {new Date(alert.startTime).toLocaleString()} - {new Date(alert.endTime).toLocaleString()}
              </p>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
