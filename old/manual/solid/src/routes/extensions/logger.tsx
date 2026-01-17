import { clientOnly } from '@solidjs/start';

const ClientOnlyComp = clientOnly(() => import('../../components/logger'));

export default function LoggerPage() {
  return <ClientOnlyComp />;
}
