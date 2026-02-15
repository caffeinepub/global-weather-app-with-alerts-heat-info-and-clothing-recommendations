import { useState, useCallback, useRef, useEffect } from 'react';
import type { PlaceSearchResult, LocationSearchState } from '../features/location/types';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const DEBOUNCE_DELAY = 300;

export function useLocationSearch() {
  const [state, setState] = useState<LocationSearchState>({
    results: [],
    isLoading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async (query: string) => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Reset state if query is too short
    if (query.trim().length < 2) {
      setState({ results: [], isLoading: false, error: null });
      return;
    }

    // Debounce the search
    debounceTimerRef.current = setTimeout(async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to search locations');
        }

        const data = await response.json();

        setState({
          results: data.results || [],
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was cancelled, ignore
          return;
        }

        setState({
          results: [],
          isLoading: false,
          error: error instanceof Error ? error.message : 'An error occurred while searching',
        });
      }
    }, DEBOUNCE_DELAY);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    search,
  };
}
