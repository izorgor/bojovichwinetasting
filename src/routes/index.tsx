import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import WinesPage from '@features/wines/pages/WinesPage';

const winesSearchSchema = z.object({
  q: z.string().optional().catch(''),
  sort: z.enum(['price-asc', 'price-desc', 'rating-asc', 'rating-desc', '']).optional().catch(''),
  yearFrom: z.number().optional().catch(undefined),
  yearTo: z.number().optional().catch(undefined),
  priceMin: z.number().optional().catch(undefined),
  priceMax: z.number().optional().catch(undefined),
});

export const Route = createFileRoute('/')({
  component: WinesPage,
  validateSearch: winesSearchSchema,
});
