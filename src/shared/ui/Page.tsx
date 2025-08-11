import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

export default function Page({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Container maxWidth="lg">
      <Box py={3}>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        {children}
      </Box>
    </Container>
  );
}
