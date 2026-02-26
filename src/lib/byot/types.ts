// BYOT (Bring Your Own Token) type definitions

export type AiProvider = 'anthropic' | 'openai';

export interface ByotConnection {
  provider: AiProvider;
  connected: boolean;
  keyLastFour: string;
  connectedAt: string;
}

export interface ByotContextValue {
  connection: ByotConnection | null;
  isConnecting: boolean;
  isResearching: boolean;
  error: string | null;
  connect: (key: string) => Promise<void>;
  disconnect: () => void;
  getKey: () => Promise<string | null>;
  research: (request: ResearchRequest) => Promise<ResearchResult>;
}

export interface ResearchRequest {
  figureName: string;
  whatHappened: string;
  sourceUrl?: string;
}

export interface ResearchResult {
  figureName: string;
  statementType: string;
  title: string;
  content: string;
  context: string;
  dateEstimate: string;
  sources: ResearchSource[];
  aiConfidence: number;
  suggestedVerdict?: string;
  rawAnalysis: string;
}

export interface ResearchSource {
  url: string;
  name: string;
  type: 'news' | 'government_record' | 'press_release' | 'social_media' | 'video' | 'other';
}

export interface VerifyKeyResponse {
  valid: boolean;
  provider?: AiProvider;
  error?: string;
}

export interface ResearchResponse {
  success: boolean;
  result?: ResearchResult;
  error?: string;
}

export interface EncryptedKeyData {
  ciphertext: string;
  iv: string;
  salt: string;
}
