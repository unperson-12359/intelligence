'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useByot } from '@/components/providers/byot-provider';
import { detectProvider, PROVIDER_CONFIG } from '@/lib/byot/providers';
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Unplug,
  Sparkles,
  Brain,
  Zap,
} from 'lucide-react';

const providerIcons = {
  anthropic: Brain,
  openai: Zap,
};

export function TokenConnector() {
  const { connection, isConnecting, error, connect, disconnect } = useByot();
  const [keyInput, setKeyInput] = useState('');
  const [localError, setLocalError] = useState('');

  const detectedProvider = keyInput.trim() ? detectProvider(keyInput.trim()) : null;

  async function handleConnect() {
    if (!keyInput.trim()) return;
    setLocalError('');
    try {
      await connect(keyInput.trim());
      setKeyInput('');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Connection failed');
    }
  }

  // Connected state
  if (connection?.connected) {
    const ProviderIcon = providerIcons[connection.provider];
    const config = PROVIDER_CONFIG[connection.provider];

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <ProviderIcon className="size-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{config.displayName}</span>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[10px]">
                Connected
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Key ending in ****{connection.keyLastFour}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnect}
            className="text-muted-foreground hover:text-destructive shrink-0"
          >
            <Unplug className="size-3.5 mr-1.5" />
            Disconnect
          </Button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your AI key is encrypted and stored locally in your browser. We never see or store it on our servers.
        </p>
      </div>
    );
  }

  // Disconnected state
  const displayError = localError || error;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="size-4 text-amber-500" />
        <h3 className="text-sm font-semibold">Bring Your Own AI</h3>
        <Badge variant="outline" className="text-[10px]">
          Beta
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Connect your own AI subscription to power research. Your key stays encrypted
        in your browser — we never store it on our servers.
      </p>

      {displayError && (
        <div className="flex items-start gap-2 rounded-md bg-red-50 dark:bg-red-950/20 p-2.5 border border-red-200 dark:border-red-900">
          <AlertCircle className="size-3.5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 dark:text-red-400">{displayError}</p>
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="password"
            placeholder={
              detectedProvider
                ? PROVIDER_CONFIG[detectedProvider].placeholder
                : 'Paste your API key (sk-ant-... or sk-...)'
            }
            value={keyInput}
            onChange={(e) => {
              setKeyInput(e.target.value);
              setLocalError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleConnect();
              }
            }}
            className="pr-16"
          />
          {detectedProvider && (
            <Badge
              variant="outline"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none"
            >
              {PROVIDER_CONFIG[detectedProvider].displayName}
            </Badge>
          )}
        </div>
        <Button
          onClick={handleConnect}
          disabled={isConnecting || !keyInput.trim()}
          size="sm"
          className="shrink-0"
        >
          {isConnecting ? (
            <>
              <Loader2 className="size-3.5 mr-1.5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="size-3.5 mr-1.5" />
              Connect
            </>
          )}
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground">
        Get a key:{' '}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Anthropic
        </a>{' '}
        or{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          OpenAI
        </a>
      </p>
    </div>
  );
}
