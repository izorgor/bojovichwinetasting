import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PropsWithChildren } from 'react';
import { useThemeStore } from '@/app/themeStore';
import { useTheme } from '@mui/material/styles';

export default function Page({ title, children }: PropsWithChildren<{ title: string }>) {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeStore();

  return (
    <Container maxWidth="lg">
      <Box py={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{title}</Typography>
          <Tooltip title={mode === 'dark' ? 'Svetli mod' : 'Tamni mod'}>
            <IconButton onClick={toggleMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
        {children}
      </Box>
    </Container>
  );
}
