import dynamic from 'next/dynamic';

const DebugReact = dynamic(() => import('../components/DebugReact'), { ssr: false });

export default function DebugReactPage() {
  return <DebugReact />;
}
