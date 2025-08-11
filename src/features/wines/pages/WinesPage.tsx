import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../../../shared/ui/Page';
import { useWines, applyFilters, SortKey } from '../hooks';
import WineCard from '../components/WineCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useMemo, useState } from 'react';

export default function WinesPage() {
  const { data, isLoading, isError } = useWines();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<SortKey | ''>('');

console.log("data", data);

  const filtered = useMemo(() => applyFilters(data, q, sort || null), [data, q, sort]);

  return (
    <Page title="Vina">
      <Box display="grid" gap={2} mb={2} gridTemplateColumns="1fr auto">
        <SearchBar value={q} onChange={setQ} />
        <Filters sort={sort} onSortChange={setSort} />
      </Box>

      {isLoading && <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>}
      {isError && <Alert severity="error">Greška pri učitavanju podataka.</Alert>}

      {!isLoading && !isError && (
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
