import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from '@tanstack/react-router';
import type { Wine } from '../types';

export default function WineCard({ wine }: { wine: Wine }) {
  const ariaLabel = `${wine.wineryName} ${wine.name}, Godina ${wine.year ?? 'nepoznata'}, Ocena ${wine.rating?.toFixed(1) ?? 'nema'}${wine.priceRsd ? `, Cena ${wine.priceRsd} dinara` : ''}`;

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      role="article"
      aria-label={ariaLabel}
    >
      <Link to="/wine/$id" params={{ id: wine.id }} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        <CardActionArea
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
          aria-label={`Pogledaj detalje za ${wine.name}`}
        >
          {wine.imageUrl && (
            <CardMedia
              component="img"
              height="180"
              image={wine.imageUrl}
              loading="lazy"
              alt={`Slika vina ${wine.name} iz vinarije ${wine.wineryName}`}
            />
          )}
          <CardContent sx={{ flexGrow: 1, width: '100%' }}>
            <Stack spacing={0.5}>
              <Typography variant="h6" component="h3">
                {wine.wineryName} {wine.name}
              </Typography>
              <Typography variant="body2" aria-label={`Godina proizvodnje: ${wine.year ?? 'nepoznata'}`}>
                Godina: {wine.year ?? '—'}
              </Typography>
              <Typography variant="body2" aria-label={`Ocena: ${wine.rating?.toFixed(1) ?? 'bez ocene'}`}>
                Ocena: {wine.rating?.toFixed(1) ?? '—'}
              </Typography>

              {(wine.priceRsd != null || wine.priceEur != null) && (
                <Typography variant="body2" aria-label={`Cena: ${wine.priceRsd} dinara`}>
                  Cena: {wine.priceRsd && `${wine.priceRsd} RSD`}
                  {wine.priceRsd && wine.priceEur && ' - '}
                  {wine.priceEur && `${wine.priceEur} €`}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
