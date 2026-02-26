import type { AiProvider } from './types';

export const PROVIDER_CONFIG: Record<
  AiProvider,
  {
    name: string;
    displayName: string;
    keyPrefix: string;
    placeholder: string;
    docsUrl: string;
    minKeyLength: number;
  }
> = {
  anthropic: {
    name: 'anthropic',
    displayName: 'Anthropic Claude',
    keyPrefix: 'sk-ant-',
    placeholder: 'sk-ant-api03-...',
    docsUrl: 'https://console.anthropic.com/settings/keys',
    minKeyLength: 40,
  },
  openai: {
    name: 'openai',
    displayName: 'OpenAI GPT',
    keyPrefix: 'sk-',
    placeholder: 'sk-proj-...',
    docsUrl: 'https://platform.openai.com/api-keys',
    minKeyLength: 30,
  },
};

/**
 * Detect the AI provider from a key's prefix.
 * Returns null if unrecognized.
 */
export function detectProvider(key: string): AiProvider | null {
  const trimmed = key.trim();
  // Check Anthropic first (more specific prefix)
  if (trimmed.startsWith('sk-ant-')) return 'anthropic';
  // OpenAI keys start with sk- (but not sk-ant-)
  if (trimmed.startsWith('sk-')) return 'openai';
  return null;
}

/**
 * Basic format validation for an AI key.
 */
export function validateKeyFormat(key: string): { valid: boolean; error?: string } {
  const trimmed = key.trim();

  if (!trimmed) {
    return { valid: false, error: 'API key is required' };
  }

  const provider = detectProvider(trimmed);
  if (!provider) {
    return {
      valid: false,
      error: 'Unrecognized key format. Keys should start with "sk-ant-" (Anthropic) or "sk-" (OpenAI)',
    };
  }

  const config = PROVIDER_CONFIG[provider];
  if (trimmed.length < config.minKeyLength) {
    return {
      valid: false,
      error: `${config.displayName} keys should be at least ${config.minKeyLength} characters`,
    };
  }

  return { valid: true };
}
