import { useParams, Link } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import Page from '@shared/ui/Page';
import { useWines } from '../hooks';

export default function WineDetailPage() {
  const { id } = useParams({ from: '/wine/$id' });
  const { data: wines, isLoading, isError } = useWines();

  if (isLoading) {
    return (
      <Page title="Učitavanje...">
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      </Page>
    );
  }

  if (isError) {
    return (
      <Page title="Greška">
        <Alert severity="error">Greška pri učitavanju podataka.</Alert>
        <Box mt={2}>
          <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
            Nazad na listu
          </Button>
        </Box>
      </Page>
    );
  }

  const wine = wines?.find((w) => w.id === id);

  if (!wine) {
    return (
      <Page title="Vino nije pronađeno">
        <Alert severity="warning">Vino sa ID "{id}" nije pronađeno.</Alert>
        <Box mt={2}>
          <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
            Nazad na listu
          </Button>
        </Box>
      </Page>
    );
  }

  return (
    <Page title="Detalji vina">
      <Box mb={2}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} variant="outlined">
          Nazad na listu
        </Button>
      </Box>

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        {wine.imageUrl && (
          <CardMedia
            component="img"
            height="400"
            image={wine.imageUrl}
            alt={`${wine.wineryName} ${wine.name}`}
            sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
          />
        )}
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {wine.name}
              </Typography>
              {wine.wineryName && (
                <Typography variant="h6" color="text.secondary">
                  {wine.wineryName}
                </Typography>
              )}
              {wine.wineryHandle && (
                <Typography variant="body2" color="text.secondary">
                  @{wine.wineryHandle}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {wine.year && (
                <Chip label={`Godina: ${wine.year}`} variant="outlined" color="primary" />
              )}
              {wine.rating != null && (
                <Chip
                  icon={<StarIcon />}
                  label={`${wine.rating.toFixed(1)} / 10`}
                  variant="outlined"
                  color="warning"
                />
              )}
            </Stack>

            {(wine.priceRsd != null || wine.priceEur != null) && (
              <Box>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {wine.priceRsd && `${wine.priceRsd} RSD`}
                  {wine.priceRsd && wine.priceEur && ' / '}
                  {wine.priceEur && `${wine.priceEur} €`}
                </Typography>
              </Box>
            )}

            {wine.captionSrb && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Opis (Srpski)
                </Typography>
                <Typography variant="body1">{wine.captionSrb}</Typography>
              </Box>
            )}

            {wine.captionEng && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Description (English)
                </Typography>
                <Typography variant="body1">{wine.captionEng}</Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
}
