export interface PlaceSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface LocationSearchState {
  results: PlaceSearchResult[];
  isLoading: boolean;
  error: string | null;
}
