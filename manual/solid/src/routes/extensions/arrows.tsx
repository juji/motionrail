import { clientOnly } from '@solidjs/start';

const ClientOnlyComp = clientOnly(() => import('../../components/arrows'));

export default function ArrowsPage() {
  return <ClientOnlyComp />;
}
