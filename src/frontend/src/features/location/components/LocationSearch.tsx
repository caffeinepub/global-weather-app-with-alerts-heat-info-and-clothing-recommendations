import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useLocationSearch } from '../../../hooks/useLocationSearch';
import type { PlaceSearchResult } from '../types';

interface LocationSearchProps {
  onSelect: (location: { name: string; lat: number; lon: number }) => void;
}

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { results, isLoading, error, search } = useLocationSearch();

  useEffect(() => {
    search(searchQuery);
    setShowResults(searchQuery.trim().length >= 2);
  }, [searchQuery, search]);

  const handleSelect = (place: PlaceSearchResult) => {
    const displayName = formatPlaceName(place);
    onSelect({
      name: displayName,
      lat: place.latitude,
      lon: place.longitude,
    });
    setSearchQuery('');
    setShowResults(false);
  };

  const formatPlaceName = (place: PlaceSearchResult): string => {
    const parts = [place.name];
    
    if (place.admin1 && place.admin1 !== place.name) {
      parts.push(place.admin1);
    }
    
    if (place.country) {
      parts.push(place.country);
    }
    
    return parts.join(', ');
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for any city or location worldwide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        <Button size="lg" disabled={isLoading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute z-50 w-full mt-2 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {error && (
              <div className="p-4 text-sm text-destructive">
                Error: {error}
              </div>
            )}

            {!error && !isLoading && results.length === 0 && searchQuery.trim().length >= 2 && (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No results found for "{searchQuery}"
              </div>
            )}

            {!error && results.length > 0 && (
              <div className="divide-y divide-border">
                {results.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handleSelect(place)}
                    className="w-full p-3 text-left hover:bg-accent transition-colors flex items-start gap-3"
                  >
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{place.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {[place.admin1, place.admin2, place.country]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
