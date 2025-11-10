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
  onFiltersChange: (filters: {
    sort?: SortKey | '' | undefined;
    yearFrom?: number | undefined;
    yearTo?: number | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
  }) => void;
}

export default function Filters({
  sort,
  yearFrom,
  yearTo,
  priceMin,
  priceMax,
  onFiltersChange,
}: FiltersProps) {
  const [localYearFrom, setLocalYearFrom] = useState(yearFrom?.toString() || '');
  const [localYearTo, setLocalYearTo] = useState(yearTo?.toString() || '');
  const [localPriceMin, setLocalPriceMin] = useState(priceMin?.toString() || '');
  const [localPriceMax, setLocalPriceMax] = useState(priceMax?.toString() || '');

  const hasActiveFilters = yearFrom || yearTo || priceMin || priceMax || sort;

  const handleApplyFilters = () => {
    onFiltersChange({
      yearFrom: localYearFrom ? parseInt(localYearFrom, 10) : undefined,
      yearTo: localYearTo ? parseInt(localYearTo, 10) : undefined,
      priceMin: localPriceMin ? parseFloat(localPriceMin) : undefined,
      priceMax: localPriceMax ? parseFloat(localPriceMax) : undefined,
    });
  };

  const handleClearFilters = () => {
    setLocalYearFrom('');
    setLocalYearTo('');
    setLocalPriceMin('');
    setLocalPriceMax('');
    onFiltersChange({
      sort: '',
      yearFrom: undefined,
      yearTo: undefined,
      priceMin: undefined,
      priceMax: undefined,
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
            <Box display="flex" gap={2}>
              <TextField
                label="Godina od"
                type="number"
                size="small"
                value={localYearFrom}
                onChange={(e) => setLocalYearFrom(e.target.value)}
                placeholder="npr. 2015"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Godina do"
                type="number"
                size="small"
                value={localYearTo}
                onChange={(e) => setLocalYearTo(e.target.value)}
                placeholder="npr. 2023"
                sx={{ flex: 1 }}
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="Cena min (RSD)"
                type="number"
                size="small"
                value={localPriceMin}
                onChange={(e) => setLocalPriceMin(e.target.value)}
                placeholder="npr. 500"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Cena max (RSD)"
                type="number"
                size="small"
                value={localPriceMax}
                onChange={(e) => setLocalPriceMax(e.target.value)}
                placeholder="npr. 5000"
                sx={{ flex: 1 }}
              />
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
