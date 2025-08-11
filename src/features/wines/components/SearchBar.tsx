import TextField from '@mui/material/TextField';

export default function SearchBar({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <TextField
      fullWidth
      label="Pretraga po vinariji"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
    />
  );
}
