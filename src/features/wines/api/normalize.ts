import { z } from 'zod';
import type { WineRow, Wine } from '../types';

export const wineRowSchema = z.object({
  winery_name: z.string(),
  wine_name: z.string(),
wine_year: z
    .coerce.number()
    .optional()
    .nullable()
    .transform((v) => (Number.isFinite(v as any) ? Number(v) : null)),
      wine_caption_srb: z.string().nullable().optional().transform(v => v ?? null),
  wine_caption_eng: z.string().nullable().optional().transform(v => v ?? null),
  wine_rate: z.coerce.number().nullable().optional().transform(v => (Number.isFinite(v as any) ? Number(v) : null)),
  wine_price_rsd: z.coerce.number().nullable().optional().transform(v => (Number.isFinite(v as any) ? Number(v) : null)),
  wine_price_eur: z.coerce.number().nullable().optional().transform(v => (Number.isFinite(v as any) ? Number(v) : null)),
  wine_image_url: z.string().nullable().optional().transform(v => v ?? null),
  wine_instagram: z.string().nullable().optional().transform(v => v ?? null), // bez '@'
});


const extractBaseName = (name: string): string => {
  // ukloni @handle i godinu na kraju, npr:
  // "Probus 276 @vinarijadeuric 2016" -> "Probus 276"
  let base = name.replace(/\s*@[\w._-]+/g, '').trim();
  base = base.replace(/\s(19|20)\d{2}\s*$/,'').trim();
  return base || name.trim();
};

export function toWine(row: WineRow): Wine {
  const parsed = wineRowSchema.parse(row);
  const year = parsed.wine_year;
  const name = extractBaseName(parsed.wine_name);
  const wineryName = parsed.winery_name

  const wineryHandle = parsed.wine_instagram?.replace(/^@/, '') ?? null;

  const idSeed = `${wineryHandle ?? 'unknown'}|${name}|${year ?? ''}`;
  const id = idSeed.toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    wineryName,
    name,
    wineryHandle,
    year,
    rating: parsed.wine_rate ?? null,
    priceRsd: parsed.wine_price_rsd ?? null,
    priceEur: parsed.wine_price_eur ?? null,
    captionSrb: parsed.wine_caption_srb ?? null,
    captionEng: parsed.wine_caption_eng ?? null,
    imageUrl: parsed.wine_image_url ?? null,
  };
}
