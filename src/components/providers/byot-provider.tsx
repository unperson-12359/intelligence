'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  AiProvider,
  ByotConnection,
  ByotContextValue,
  ResearchRequest,
  ResearchResult,
  VerifyKeyResponse,
  ResearchResponse,
} from '@/lib/byot/types';
import { detectProvider, validateKeyFormat } from '@/lib/byot/providers';
import {
  storeEncryptedKey,
  retrieveDecryptedKey,
  clearStoredKey,
  hasStoredKey,
} from '@/lib/byot/crypto';

const ByotContext = createContext<ByotContextValue | null>(null);

const CONNECTION_META_KEY = 'byot-connection-meta';

function storeConnectionMeta(provider: AiProvider, keyLastFour: string) {
  localStorage.setItem(
    CONNECTION_META_KEY,
    JSON.stringify({ provider, keyLastFour, connectedAt: new Date().toISOString() })
  );
}

function loadConnectionMeta(): Omit<ByotConnection, 'connected'> | null {
  try {
    const raw = localStorage.getItem(CONNECTION_META_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearConnectionMeta() {
  localStorage.removeItem(CONNECTION_META_KEY);
}

export function ByotProvider({ children }: { children: ReactNode }) {
  const [connection, setConnection] = useState<ByotConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore connection on mount
  useEffect(() => {
    if (hasStoredKey()) {
      const meta = loadConnectionMeta();
      if (meta) {
        setConnection({
          provider: meta.provider,
          connected: true,
          keyLastFour: meta.keyLastFour,
          connectedAt: meta.connectedAt,
        });
      }
    }
  }, []);

  const connect = useCallback(async (key: string) => {
    setError(null);
    setIsConnecting(true);

    try {
      // 1. Validate format locally
      const formatCheck = validateKeyFormat(key);
      if (!formatCheck.valid) {
        throw new Error(formatCheck.error);
      }

      const provider = detectProvider(key)!;

      // 2. Verify with server (makes minimal API call)
      const res = await fetch('/api/byot/verify-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AI-Token': key,
        },
      });

      const data: VerifyKeyResponse = await res.json();
      if (!data.valid) {
        throw new Error(data.error || 'Key verification failed');
      }

      // 3. Encrypt and store
      await storeEncryptedKey(key);
      const keyLastFour = key.slice(-4);
      storeConnectionMeta(provider, keyLastFour);

      setConnection({
        provider,
        connected: true,
        keyLastFour,
        connectedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    clearStoredKey();
    clearConnectionMeta();
    setConnection(null);
    setError(null);
  }, []);

  const getKey = useCallback(async (): Promise<string | null> => {
    return retrieveDecryptedKey();
  }, []);

  const research = useCallback(
    async (request: ResearchRequest): Promise<ResearchResult> => {
      setIsResearching(true);
      setError(null);

      try {
        const key = await retrieveDecryptedKey();
        if (!key) {
          throw new Error('No API key found. Please connect your AI key first.');
        }

        const res = await fetch('/api/byot/research', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-AI-Token': key,
          },
          body: JSON.stringify(request),
        });

        const data: ResearchResponse = await res.json();

        if (!data.success || !data.result) {
          throw new Error(data.error || 'Research failed');
        }

        return data.result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Research failed';
        setError(message);
        throw err;
      } finally {
        setIsResearching(false);
      }
    },
    []
  );

  return (
    <ByotContext.Provider
      value={{
        connection,
        isConnecting,
        isResearching,
        error,
        connect,
        disconnect,
        getKey,
        research,
      }}
    >
      {children}
    </ByotContext.Provider>
  );
}

export function useByot(): ByotContextValue {
  const context = useContext(ByotContext);
  if (!context) {
    throw new Error('useByot must be used within a ByotProvider');
  }
  return context;
}
