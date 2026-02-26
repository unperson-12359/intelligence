/**
 * Client-side encryption for BYOT API keys using Web Crypto API.
 * Keys are encrypted with AES-GCM-256 before storing in localStorage.
 * The encryption key is derived from a random salt unique to the device.
 */

import type { EncryptedKeyData } from './types';

const STORAGE_KEY = 'byot-encrypted-key';
const SALT_KEY = 'byot-device-salt';

function isClientSide(): boolean {
  return typeof window !== 'undefined' && typeof window.crypto !== 'undefined';
}

function toBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function fromBase64(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Get or create a device-specific salt for key derivation.
 */
function getOrCreateSalt(): string {
  if (!isClientSide()) throw new Error('Crypto operations require browser environment');

  let salt = localStorage.getItem(SALT_KEY);
  if (!salt) {
    const saltBytes = crypto.getRandomValues(new Uint8Array(32));
    salt = toBase64(saltBytes.buffer);
    localStorage.setItem(SALT_KEY, salt);
  }
  return salt;
}

/**
 * Derive an AES-GCM-256 key from the device salt.
 */
async function deriveKey(salt: string): Promise<CryptoKey> {
  const saltBuffer = fromBase64(salt);
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    saltBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt an API key for storage.
 */
export async function encryptKey(plaintext: string): Promise<EncryptedKeyData> {
  const salt = getOrCreateSalt();
  const key = await deriveKey(salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return {
    ciphertext: toBase64(ciphertext),
    iv: toBase64(iv.buffer),
    salt,
  };
}

/**
 * Decrypt a stored API key.
 */
export async function decryptKey(encrypted: EncryptedKeyData): Promise<string> {
  const key = await deriveKey(encrypted.salt);
  const iv = fromBase64(encrypted.iv);
  const ciphertext = fromBase64(encrypted.ciphertext);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Encrypt and store an API key in localStorage.
 */
export async function storeEncryptedKey(plaintext: string): Promise<void> {
  const encrypted = await encryptKey(plaintext);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(encrypted));
}

/**
 * Retrieve and decrypt the stored API key.
 * Returns null if no key is stored or decryption fails.
 */
export async function retrieveDecryptedKey(): Promise<string | null> {
  if (!isClientSide()) return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const encrypted: EncryptedKeyData = JSON.parse(stored);
    return await decryptKey(encrypted);
  } catch {
    // If decryption fails (corrupted data, salt changed), clear it
    clearStoredKey();
    return null;
  }
}

/**
 * Remove the stored encrypted key and salt.
 */
export function clearStoredKey(): void {
  if (!isClientSide()) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SALT_KEY);
}

/**
 * Check if an encrypted key exists in storage (without decrypting).
 */
export function hasStoredKey(): boolean {
  if (!isClientSide()) return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}
