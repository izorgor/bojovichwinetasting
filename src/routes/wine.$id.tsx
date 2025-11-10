import { createFileRoute } from '@tanstack/react-router';
import WineDetailPage from '@features/wines/pages/WineDetailPage';

export const Route = createFileRoute('/wine/$id')({
  component: WineDetailPage,
});
