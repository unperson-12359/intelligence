import { formatDate, formatRelativeDate } from '@/lib/format';

describe('formatDate', () => {
  it('formats a standard date string correctly', () => {
    expect(formatDate('2023-01-15')).toBe('Jan 15, 2023');
  });

  it('formats dates for different months', () => {
    expect(formatDate('2024-06-01')).toBe('Jun 1, 2024');
    expect(formatDate('2022-12-25')).toBe('Dec 25, 2022');
    expect(formatDate('2023-03-08')).toBe('Mar 8, 2023');
  });

  it('handles single-digit days correctly', () => {
    expect(formatDate('2023-07-05')).toBe('Jul 5, 2023');
  });

  it('handles double-digit days correctly', () => {
    expect(formatDate('2023-11-28')).toBe('Nov 28, 2023');
  });

  it('returns the original string for an invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
    expect(formatDate('')).toBe('');
  });
});

describe('formatRelativeDate', () => {
  it('returns a string containing "ago" for past dates', () => {
    // Use a date far enough in the past to reliably produce "ago"
    const result = formatRelativeDate('2020-01-01');
    expect(result).toContain('ago');
  });

  it('returns a relative time string (not the original date)', () => {
    const result = formatRelativeDate('2020-06-15');
    // Should NOT return the raw date string
    expect(result).not.toBe('2020-06-15');
  });

  it('returns the original string for an invalid date', () => {
    expect(formatRelativeDate('not-a-date')).toBe('not-a-date');
    expect(formatRelativeDate('')).toBe('');
  });

  it('returns a string for a recent date', () => {
    // Yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    const result = formatRelativeDate(dateStr);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
