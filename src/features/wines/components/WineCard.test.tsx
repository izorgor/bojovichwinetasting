import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createRouter, createRootRoute, createMemoryHistory } from '@tanstack/react-router';
import WineCard from './WineCard';
import type { Wine } from '../types';

const mockWine: Wine = {
  id: 'test-wine',
  name: 'Probus 276',
  wineryName: 'Vinarija Deurić',
  wineryHandle: 'vinarijadeuric',
  year: '2020',
  rating: 8.5,
  priceRsd: 2500,
  priceEur: 22,
  captionSrb: 'Odlično vino',
  captionEng: 'Excellent wine',
  imageUrl: 'https://example.com/image.jpg',
};

// Helper to render with router
const renderWithRouter = (ui: React.ReactElement) => {
  const rootRoute = createRootRoute({
    component: () => ui,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  return render(<RouterProvider router={router} />);
};

describe('WineCard', () => {
  it('renders wine name and winery', () => {
    renderWithRouter(<WineCard wine={mockWine} />);
    expect(screen.getByText(/Vinarija Deurić/i)).toBeInTheDocument();
    expect(screen.getByText(/Probus 276/i)).toBeInTheDocument();
  });

  it('renders year when available', () => {
    renderWithRouter(<WineCard wine={mockWine} />);
    expect(screen.getByText(/Godina: 2020/i)).toBeInTheDocument();
  });

  it('renders rating when available', () => {
    renderWithRouter(<WineCard wine={mockWine} />);
    expect(screen.getByText(/Ocena: 8.5/i)).toBeInTheDocument();
  });

  it('renders price in RSD when available', () => {
    renderWithRouter(<WineCard wine={mockWine} />);
    expect(screen.getByText(/2500 RSD/i)).toBeInTheDocument();
  });

  it('renders placeholder when year is not available', () => {
    const wineWithoutYear = { ...mockWine, year: null };
    renderWithRouter(<WineCard wine={wineWithoutYear} />);
    expect(screen.getByText(/Godina: —/i)).toBeInTheDocument();
  });

  it('renders placeholder when rating is not available', () => {
    const wineWithoutRating = { ...mockWine, rating: null };
    renderWithRouter(<WineCard wine={wineWithoutRating} />);
    expect(screen.getByText(/Ocena: —/i)).toBeInTheDocument();
  });
});
