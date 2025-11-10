import { Component, ReactNode } from 'react';
import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          p={3}
        >
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon fontSize="large" />}
            sx={{ maxWidth: 600, width: '100%' }}
          >
            <AlertTitle>Nešto je pošlo po zlu</AlertTitle>
            <Typography variant="body2" gutterBottom>
              Došlo je do neočekivane greške u aplikaciji.
            </Typography>
            {this.state.error && (
              <Typography variant="caption" component="pre" sx={{ mt: 2, fontSize: '0.75rem' }}>
                {this.state.error.message}
              </Typography>
            )}
            <Box mt={2}>
              <Button variant="contained" onClick={this.handleReset} size="small">
                Pokušaj ponovo
              </Button>
            </Box>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
