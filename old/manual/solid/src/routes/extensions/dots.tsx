import { clientOnly } from '@solidjs/start';

const ClientOnlyComp = clientOnly(() => import('../../components/dots'));

export default function DotsPage() {
  return <ClientOnlyComp />;
}
