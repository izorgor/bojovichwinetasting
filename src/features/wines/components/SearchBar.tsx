import TextField from '@mui/material/TextField';

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <TextField
      fullWidth
      label="Pretraga po vinariji"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      placeholder="Unesite ime vinarije ili vina..."
      inputProps={{
        'aria-label': 'Pretraži vina po nazivu ili vinariji',
        'aria-describedby': 'search-help',
      }}
      helperText={
        <span id="search-help" style={{ display: 'none' }}>
          Pretraži vina po nazivu ili imenu vinarije
        </span>
      }
    />
  );
}
