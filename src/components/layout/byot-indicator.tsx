'use client';

import Link from 'next/link';
import { useByot } from '@/components/providers/byot-provider';
import { PROVIDER_CONFIG } from '@/lib/byot/providers';
import { Brain, Zap } from 'lucide-react';

const providerIcons = {
  anthropic: Brain,
  openai: Zap,
};

export function ByotIndicator() {
  const { connection } = useByot();

  if (!connection?.connected) return null;

  const ProviderIcon = providerIcons[connection.provider];
  const config = PROVIDER_CONFIG[connection.provider];

  return (
    <Link
      href="/contribute"
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
      title={`${config.displayName} connected (****${connection.keyLastFour})`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <ProviderIcon className="size-3" />
      <span className="hidden lg:inline">AI Connected</span>
    </Link>
  );
}
