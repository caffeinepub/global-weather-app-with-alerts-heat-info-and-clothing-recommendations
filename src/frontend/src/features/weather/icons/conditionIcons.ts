// Map weather codes to icon paths
// WMO Weather interpretation codes (WW)
export function getWeatherIcon(code: number): string {
  if (code === 0) return '/assets/generated/icon-sun.dim_128x128.png'; // Clear sky
  if (code >= 1 && code <= 3) return '/assets/generated/icon-cloud.dim_128x128.png'; // Partly cloudy
  if (code >= 51 && code <= 67) return '/assets/generated/icon-rain.dim_128x128.png'; // Rain
  if (code >= 80 && code <= 82) return '/assets/generated/icon-rain.dim_128x128.png'; // Rain showers
  if (code >= 95 && code <= 99) return '/assets/generated/icon-storm.dim_128x128.png'; // Thunderstorm
  return '/assets/generated/icon-cloud.dim_128x128.png'; // Default
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
}
