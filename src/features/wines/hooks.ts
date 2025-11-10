import { useQuery } from '@tanstack/react-query';
import { fetchWines } from './api/sheets';
import type { Wine } from './types';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const GID = import.meta.env.VITE_SHEET_GID || '0';

export function useWines() {
  return useQuery<Wine[]>({
    queryKey: ['wines'],
    queryFn: () => fetchWines(SHEET_ID, GID),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export type SortKey = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';

export interface WineFilters {
  q?: string;
  sort?: SortKey | null;
  yearFrom?: number | null;
  yearTo?: number | null;
  priceMin?: number | null;
  priceMax?: number | null;
  wineries?: string[] | null;
  ratingMin?: number | null;
  ratingMax?: number | null;
}

// helper koji sigurno vraća lowercase string
const lc = (v: unknown) => (v ?? '').toString().toLowerCase();

// Funkcija za dobijanje liste svih vinarija iz podataka
export function getUniqueWineries(data: Wine[] | undefined): string[] {
  if (!data) return [];

  const wineries = new Set<string>();
  data.forEach((wine) => {
    if (wine.wineryName) {
      wineries.add(wine.wineryName);
    }
  });

  return Array.from(wineries).sort();
}

export function applyFilters(data: Wine[] | undefined, filters: WineFilters) {
  if (!data) return [];

  let out = data;
  const { q = '', sort = null, yearFrom, yearTo, priceMin, priceMax, wineries, ratingMin, ratingMax } = filters;

  // pretraga po vinariji ili imenu vina
  const needle = lc(q).replace(/^@/, '');
  if (needle) {
    out = out.filter((w) => lc(w.wineryHandle).includes(needle) || lc(w.name).includes(needle));
  }

  // filter po vinarijama (multi-select)
  if (wineries && wineries.length > 0) {
    out = out.filter((w) => w.wineryName && wineries.includes(w.wineryName));
  }

  // filter po godini
  if (yearFrom != null || yearTo != null) {
    out = out.filter((w) => {
      if (!w.year) return false;
      const year = parseInt(w.year, 10);
      if (isNaN(year)) return false;
      if (yearFrom != null && year < yearFrom) return false;
      if (yearTo != null && year > yearTo) return false;
      return true;
    });
  }

  // filter po ceni (koristi RSD ili EUR ako RSD nije dostupan)
  if (priceMin != null || priceMax != null) {
    out = out.filter((w) => {
      const price = w.priceRsd ?? w.priceEur;
      if (price == null) return false;
      if (priceMin != null && price < priceMin) return false;
      if (priceMax != null && price > priceMax) return false;
      return true;
    });
  }

  // filter po oceni (rating range)
  if (ratingMin != null || ratingMax != null) {
    out = out.filter((w) => {
      if (w.rating == null) return false;
      if (ratingMin != null && w.rating < ratingMin) return false;
      if (ratingMax != null && w.rating > ratingMax) return false;
      return true;
    });
  }

  // sortiranje
  if (sort) {
    const [key, dir] = sort.split('-') as ['price' | 'rating', 'asc' | 'desc'];
    out = [...out].sort((a, b) => {
      const va = key === 'price' ? (a.priceRsd ?? a.priceEur ?? 0) : (a.rating ?? 0);
      const vb = key === 'price' ? (b.priceRsd ?? b.priceEur ?? 0) : (b.rating ?? 0);
      return dir === 'asc' ? va - vb : vb - va;
    });
  }

  return out;
}
