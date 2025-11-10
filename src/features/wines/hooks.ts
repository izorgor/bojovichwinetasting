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
}

// helper koji sigurno vraća lowercase string
const lc = (v: unknown) => (v ?? '').toString().toLowerCase();

export function applyFilters(data: Wine[] | undefined, filters: WineFilters) {
  if (!data) return [];

  let out = data;
  const { q = '', sort = null, yearFrom, yearTo, priceMin, priceMax } = filters;

  // pretraga po vinariji ili imenu vina
  const needle = lc(q).replace(/^@/, '');
  if (needle) {
    out = out.filter((w) => lc(w.wineryHandle).includes(needle) || lc(w.name).includes(needle));
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
