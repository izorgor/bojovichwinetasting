import { useQuery } from '@tanstack/react-query';
import { fetchWines } from './api/sheets';
import type { Wine } from './types';

const SHEET_ID = '1-sUfboM9w4t6znkKJ27Zx5XA0ePbxq5jw7vZzkfLkiY';
const GID = '0'; // zameni ako tvoja tabela nije prva

export function useWines() {
  return useQuery<Wine[]>({
    queryKey: ['wines'],
    queryFn: () => fetchWines(SHEET_ID, GID),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export type SortKey = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';

// helper koji sigurno vraća lowercase string
const lc = (v: unknown) => (v ?? '').toString().toLowerCase();

export function applyFilters(
  data: Wine[] | undefined,
  q: string = '',
  sort: SortKey | null,
) {
  if (!data) return [];

  let out = data;

  // pretraga po vinariji ili imenu vina
  const needle = lc(q).replace(/^@/, '');
  if (needle) {
    out = out.filter(
      (w) => lc(w.wineryHandle).includes(needle) || lc(w.name).includes(needle),
    );
  }

  // sortiranje
  if (sort) {
    const [key, dir] = sort.split('-') as ['price' | 'rating', 'asc' | 'desc'];
    out = [...out].sort((a, b) => {
      const va = key === 'price'
        ? (a.priceRsd ?? a.priceEur ?? 0)
        : (a.rating ?? 0);
      const vb = key === 'price'
        ? (b.priceRsd ?? b.priceEur ?? 0)
        : (b.rating ?? 0);
      return dir === 'asc' ? va - vb : vb - va;
    });
  }

  return out;
}
