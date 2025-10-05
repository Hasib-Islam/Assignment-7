'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichEditor({ value, onChange }: RichEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  if (!mounted) {
    return (
      <div className="w-full h-96 border rounded-md p-4 bg-muted animate-pulse">
        Loading editor...
      </div>
    );
  }

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        height={400}
        visibleDragbar={false}
      />
    </div>
  );
}
