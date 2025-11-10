import { toWine } from './normalize';
import type { Wine, WineRow } from '../types';

interface SheetColumn {
  label?: string;
  id?: string;
}

interface SheetCell {
  v?: string | number | null;
}

interface SheetRow {
  c: SheetCell[];
}

interface SheetResponse {
  table: {
    cols: SheetColumn[];
    rows: SheetRow[];
  };
}

export async function fetchWines(sheetId: string, gid = '0'): Promise<Wine[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ne mogu da preuzmem podatke sa GSheeta');
  const text = await res.text();

  const start = text.indexOf('(');
  const end = text.lastIndexOf(')');
  const json = JSON.parse(text.slice(start + 1, end)) as SheetResponse;
  const cols: string[] = json.table.cols.map((c) => (c.label || c.id || '').trim());
  const rows: SheetRow[] = json.table.rows;

  // očekujemo tačno ove header-e; tolerisaćemo varijacije u velikim/malim slovima
  const norm = (s: string) => s.trim().toLowerCase();
  const idx = Object.fromEntries(cols.map((c: string, i: number) => [norm(c), i]));

  const get = (r: SheetRow, key: string) => r.c[idx[key]]?.v ?? null;

  // Helper funkcije za konverziju tipova
  const getString = (r: SheetRow, key: string): string | null => {
    const val = get(r, key);
    return val != null ? String(val) : null;
  };

  const getNumber = (r: SheetRow, key: string): number | null => {
    const val = get(r, key);
    return typeof val === 'number' ? val : null;
  };

  const out: Wine[] = rows
    .map(
      (r): WineRow => ({
        winery_name: getString(r, 'winery_name') ?? '',
        wine_year: getString(r, 'wine_year') ?? '',
        wine_name: getString(r, 'wine_name') ?? '',
        wine_caption_srb: getString(r, 'wine_caption_srb'),
        wine_caption_eng: getString(r, 'wine_caption_eng'),
        wine_rate: getNumber(r, 'wine_rate'),
        wine_price_rsd: getNumber(r, 'wine_price_rsd'),
        wine_price_eur: getNumber(r, 'wine_price_eur'),
        wine_image_url: getString(r, 'wine_image_url'),
        wine_instagram: getString(r, 'wine_instagram')?.replace(/^@/, '') || null,
      }),
    )
    .filter((r) => r.wine_name) // odbaci prazne redove
    .map(toWine);

  return out;
}
