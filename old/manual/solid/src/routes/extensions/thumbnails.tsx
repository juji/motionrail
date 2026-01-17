import { clientOnly } from '@solidjs/start';

const ClientOnlyComp = clientOnly(() => import('../../components/thumbnails'));

export default function ThumbnailsPage() {
  return <ClientOnlyComp />;
}
