import { toWine } from './normalize';
import type { Wine, WineRow } from '../types';

export async function fetchWines(sheetId: string, gid = '0'): Promise<Wine[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ne mogu da preuzmem podatke sa GSheeta');
  const text = await res.text();

  const start = text.indexOf('(');
  const end = text.lastIndexOf(')');
  const json = JSON.parse(text.slice(start + 1, end));
  const cols: string[] = json.table.cols.map((c: any) => (c.label || c.id || '').trim());
  const rows: any[] = json.table.rows;

  // očekujemo tačno ove header-e; tolerisaćemo varijacije u velikim/malim slovima
  const norm = (s: string) => s.trim().toLowerCase();
  const idx = Object.fromEntries(cols.map((c: string, i: number) => [norm(c), i]));

  const get = (r: any, key: string) => r.c[idx[key]]?.v ?? null;

  const out: Wine[] = rows
    .map((r): WineRow => ({
      winery_name: get(r, 'winery_name') ?? '',
      wine_year: get(r, 'wine_year') ?? '',
      wine_name: get(r, 'wine_name') ?? '',
      wine_caption_srb: get(r, 'wine_caption_srb'),
      wine_caption_eng: get(r, 'wine_caption_eng'),
      wine_rate: get(r, 'wine_rate'),
      wine_price_rsd: get(r, 'wine_price_rsd'),
      wine_price_eur: get(r, 'wine_price_eur'),
      wine_image_url: get(r, 'wine_image_url'),
      wine_instagram: (get(r, 'wine_instagram') ?? '')?.replace(/^@/, '') || null,
    }))
    .filter(r => r.wine_name) // odbaci prazne redove
    .map(toWine);

  return out;
}
