import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SortKey } from '../hooks';
import { useState } from 'react';

interface FiltersProps {
  sort: SortKey | '';
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  wineries?: string[];
  ratingMin?: number;
  ratingMax?: number;
  availableWineries: string[];
  onFiltersChange: (filters: {
    sort?: SortKey | '' | undefined;
    yearFrom?: number | undefined;
    yearTo?: number | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    wineries?: string[] | undefined;
    ratingMin?: number | undefined;
    ratingMax?: number | undefined;
  }) => void;
}

export default function Filters({
  sort,
  yearFrom,
  yearTo,
  priceMin,
  priceMax,
  wineries = [],
  ratingMin,
  ratingMax,
  availableWineries,
  onFiltersChange,
}: FiltersProps) {
  const [localYearFrom, setLocalYearFrom] = useState(yearFrom?.toString() || '');
  const [localYearTo, setLocalYearTo] = useState(yearTo?.toString() || '');
  const [localPriceMin, setLocalPriceMin] = useState(priceMin?.toString() || '');
  const [localPriceMax, setLocalPriceMax] = useState(priceMax?.toString() || '');
  const [localRatingMin, setLocalRatingMin] = useState(ratingMin?.toString() || '');
  const [localRatingMax, setLocalRatingMax] = useState(ratingMax?.toString() || '');

  const hasActiveFilters =
    yearFrom ||
    yearTo ||
    priceMin ||
    priceMax ||
    sort ||
    (wineries && wineries.length > 0) ||
    ratingMin ||
    ratingMax;

  const handleWineriesChange = (event: { target: { value: unknown } }) => {
    const value = event.target.value as string[];
    onFiltersChange({
      wineries: value.length > 0 ? value : undefined,
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      yearFrom: localYearFrom ? parseInt(localYearFrom, 10) : undefined,
      yearTo: localYearTo ? parseInt(localYearTo, 10) : undefined,
      priceMin: localPriceMin ? parseFloat(localPriceMin) : undefined,
      priceMax: localPriceMax ? parseFloat(localPriceMax) : undefined,
      ratingMin: localRatingMin ? parseFloat(localRatingMin) : undefined,
      ratingMax: localRatingMax ? parseFloat(localRatingMax) : undefined,
    });
  };

  const handleClearFilters = () => {
    setLocalYearFrom('');
    setLocalYearTo('');
    setLocalPriceMin('');
    setLocalPriceMax('');
    setLocalRatingMin('');
    setLocalRatingMax('');
    onFiltersChange({
      sort: '',
      yearFrom: undefined,
      yearTo: undefined,
      priceMin: undefined,
      priceMax: undefined,
      wineries: undefined,
      ratingMin: undefined,
      ratingMax: undefined,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sortiraj</InputLabel>
          <Select
            label="Sortiraj"
            value={sort}
            onChange={(e) => onFiltersChange({ sort: e.target.value as SortKey | '' })}
          >
            <MenuItem value="">Bez sortiranja</MenuItem>
            <MenuItem value="price-asc">Cena (rastuće)</MenuItem>
            <MenuItem value="price-desc">Cena (opadajuće)</MenuItem>
            <MenuItem value="rating-asc">Ocena (rastuće)</MenuItem>
            <MenuItem value="rating-desc">Ocena (opadajuće)</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 250 }}>
          <InputLabel>Vinarije</InputLabel>
          <Select
            multiple
            value={wineries}
            onChange={handleWineriesChange}
            input={<OutlinedInput label="Vinarije" />}
            renderValue={(selected) =>
              selected.length === 0 ? (
                <em>Sve vinarije</em>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {availableWineries.map((winery) => (
              <MenuItem key={winery} value={winery}>
                <Checkbox checked={wineries.indexOf(winery) > -1} />
                <ListItemText primary={winery} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Button size="small" onClick={handleClearFilters} variant="outlined">
            Očisti filtere
          </Button>
        )}
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" gap={1}>
            <FilterListIcon fontSize="small" />
            <Typography>Dodatni filteri</Typography>
            {hasActiveFilters && (
              <Typography variant="caption" color="primary">
                (aktivni)
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Filter po oceni */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Ocena
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  label="Min"
                  type="number"
                  size="small"
                  value={localRatingMin}
                  onChange={(e) => setLocalRatingMin(e.target.value)}
                  placeholder="0"
                  inputProps={{ min: 0, max: 10, step: 0.1 }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Max"
                  type="number"
                  size="small"
                  value={localRatingMax}
                  onChange={(e) => setLocalRatingMax(e.target.value)}
                  placeholder="10"
                  inputProps={{ min: 0, max: 10, step: 0.1 }}
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* Filter po godini */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Godina proizvodnje
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  label="Od"
                  type="number"
                  size="small"
                  value={localYearFrom}
                  onChange={(e) => setLocalYearFrom(e.target.value)}
                  placeholder="npr. 2015"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Do"
                  type="number"
                  size="small"
                  value={localYearTo}
                  onChange={(e) => setLocalYearTo(e.target.value)}
                  placeholder="npr. 2023"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            {/* Filter po ceni */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Cena (RSD)
              </Typography>
              <Box display="flex" gap={2}>
                <TextField
                  label="Min"
                  type="number"
                  size="small"
                  value={localPriceMin}
                  onChange={(e) => setLocalPriceMin(e.target.value)}
                  placeholder="npr. 500"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Max"
                  type="number"
                  size="small"
                  value={localPriceMax}
                  onChange={(e) => setLocalPriceMax(e.target.value)}
                  placeholder="npr. 5000"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            <Button variant="contained" onClick={handleApplyFilters}>
              Primeni filtere
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
