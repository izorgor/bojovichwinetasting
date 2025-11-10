import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSearch, useNavigate } from '@tanstack/react-router';
import Page from '@shared/ui/Page';
import { useWines, applyFilters, SortKey } from '../hooks';
import WineCard from '../components/WineCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useMemo } from 'react';

export default function WinesPage() {
  const { data, isLoading, isError } = useWines();
  const search = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  const updateSearch = (updates: Partial<typeof search>) => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev, ...updates };
        // Remove undefined values to keep URL clean
        Object.keys(newSearch).forEach((key) => {
          if (newSearch[key as keyof typeof newSearch] === undefined) {
            delete newSearch[key as keyof typeof newSearch];
          }
        });
        return newSearch;
      },
    });
  };

  const filtered = useMemo(
    () =>
      applyFilters(data, {
        q: search.q,
        sort: search.sort as SortKey | undefined,
        yearFrom: search.yearFrom,
        yearTo: search.yearTo,
        priceMin: search.priceMin,
        priceMax: search.priceMax,
      }),
    [data, search],
  );

  return (
    <Page title="Vina">
      <Box display="flex" flexDirection="column" gap={2} mb={2}>
        <SearchBar value={search.q || ''} onChange={(q) => updateSearch({ q: q || undefined })} />
        <Filters
          sort={(search.sort as SortKey) || ''}
          yearFrom={search.yearFrom}
          yearTo={search.yearTo}
          priceMin={search.priceMin}
          priceMax={search.priceMax}
          onFiltersChange={updateSearch}
        />
      </Box>

      {isLoading && (
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card variant="outlined">
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="70%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isError && <Alert severity="error">Greška pri učitavanju podataka.</Alert>}

      {!isLoading && !isError && filtered.length === 0 && (
        <Box display="flex" flexDirection="column" alignItems="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nema rezultata
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pokušajte sa drugim pojmom za pretragu ili promenite filtere
          </Typography>
        </Box>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <Grid container spacing={2}>
          {filtered.map((w, i) => (
            <Grid key={`${w.id}-${i}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <WineCard wine={w} />
            </Grid>
          ))}
        </Grid>
      )}
    </Page>
  );
}
