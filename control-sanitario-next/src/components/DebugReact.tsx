import React, { useEffect, useState } from 'react';

export default function DebugReact() {
  const [msg, setMsg] = useState('Inicializando...');

  useEffect(() => {
    let info = { defaultImportType: typeof React, hasNamedUseState: false, hasReactUseState: null, error: null };
    try {
      info.hasNamedUseState = typeof useState === 'function';
    } catch (e) {
      info.error = String(e);
    }

    try {
      info.hasReactUseState = React ? typeof (React as any).useState === 'function' : null;
    } catch (e) {
      info.error = String(e);
    }

    console.log('DebugReact info:', info);
    setMsg(JSON.stringify(info, null, 2));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Debug React (cliente)</h1>
      <p className="whitespace-pre-wrap font-mono">{msg}</p>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Abre la consola del navegador para ver el mismo objeto `DebugReact info`.</p>
    </div>
  );
}
