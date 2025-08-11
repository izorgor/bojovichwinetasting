import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { Wine } from '../types';

export default function WineCard({ wine }: { wine: Wine }) {
  return (
    <Card variant="outlined">
      {wine.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={wine.imageUrl}
          loading="lazy"
        />
      )}
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="h6">
            {wine.wineryName} {wine.name}
          </Typography>
          <Typography variant="body2">Godina: {wine.year ?? '—'}</Typography>
          <Typography variant="body2">Ocena: {wine.rating?.toFixed(1) ?? '—'}</Typography>

          {(wine.priceRsd != null || wine.priceEur != null) && (
            <Typography variant="body2">
              Cena: {wine.priceRsd && `${wine.priceRsd} RSD`}
              {wine.priceRsd && wine.priceEur && ' - '}
              {wine.priceEur && `${wine.priceEur} €`}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
