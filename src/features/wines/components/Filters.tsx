import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SortKey } from '../hooks';

export default function Filters({
  sort, onSortChange,
}: { sort: SortKey | ''; onSortChange: (v: SortKey | '') => void }) {
  return (
    <Box display="flex" gap={2}>
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel>Sortiraj</InputLabel>
        <Select
          label="Sortiraj"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey | '')}
        >
          <MenuItem value="">Bez sortiranja</MenuItem>
          <MenuItem value="price-asc">Cena (rast.)</MenuItem>
          <MenuItem value="price-desc">Cena (opad.)</MenuItem>
          <MenuItem value="rating-asc">Ocena (rast.)</MenuItem>
          <MenuItem value="rating-desc">Ocena (opad.)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
