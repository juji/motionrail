import { clientOnly } from '@solidjs/start';

const ClientOnlyComp = clientOnly(() => import('../components/home'));

export default function Home() {
  return <ClientOnlyComp />;
}
