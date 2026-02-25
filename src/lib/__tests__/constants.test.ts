import { getGradeFromScore, SCORE_GRADES, GRADE_ORDER } from '@/lib/constants';

describe('getGradeFromScore', () => {
  it('returns A for scores >= 70', () => {
    expect(getGradeFromScore(70)).toBe('A');
    expect(getGradeFromScore(80)).toBe('A');
    expect(getGradeFromScore(100)).toBe('A');
  });

  it('returns B for scores 40-69', () => {
    expect(getGradeFromScore(40)).toBe('B');
    expect(getGradeFromScore(55)).toBe('B');
    expect(getGradeFromScore(69)).toBe('B');
  });

  it('returns C for scores 10-39', () => {
    expect(getGradeFromScore(10)).toBe('C');
    expect(getGradeFromScore(25)).toBe('C');
    expect(getGradeFromScore(39)).toBe('C');
  });

  it('returns D for scores -20 to 9', () => {
    expect(getGradeFromScore(-20)).toBe('D');
    expect(getGradeFromScore(0)).toBe('D');
    expect(getGradeFromScore(9)).toBe('D');
  });

  it('returns F for scores below -20', () => {
    expect(getGradeFromScore(-21)).toBe('F');
    expect(getGradeFromScore(-50)).toBe('F');
    expect(getGradeFromScore(-100)).toBe('F');
  });

  it('handles boundary values correctly', () => {
    // Exact boundaries between grades
    expect(getGradeFromScore(70)).toBe('A');
    expect(getGradeFromScore(69)).toBe('B');
    expect(getGradeFromScore(40)).toBe('B');
    expect(getGradeFromScore(39)).toBe('C');
    expect(getGradeFromScore(10)).toBe('C');
    expect(getGradeFromScore(9)).toBe('D');
    expect(getGradeFromScore(-20)).toBe('D');
    expect(getGradeFromScore(-21)).toBe('F');
  });
});

describe('SCORE_GRADES', () => {
  it('has no gaps in score ranges', () => {
    const entries = Object.entries(SCORE_GRADES);
    // Collect all ranges
    const ranges = entries.map(([grade, { min, max }]) => ({ grade, min, max }));
    // Sort by min descending
    ranges.sort((a, b) => b.min - a.min);

    // Check that every integer from -100 to 100 is covered by exactly one range
    for (let score = -100; score <= 100; score++) {
      const matchingRanges = ranges.filter((r) => score >= r.min && score <= r.max);
      expect(matchingRanges.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('has no overlapping ranges', () => {
    const entries = Object.entries(SCORE_GRADES);
    const ranges = entries.map(([grade, { min, max }]) => ({ grade, min, max }));

    // Check every pair of ranges for overlap
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        const a = ranges[i];
        const b = ranges[j];
        const overlaps = a.min <= b.max && b.min <= a.max;
        if (overlaps) {
          fail(`Ranges overlap: ${a.grade} [${a.min},${a.max}] and ${b.grade} [${b.min},${b.max}]`);
        }
      }
    }
  });

  it('covers the full score range from -100 to 100', () => {
    const entries = Object.entries(SCORE_GRADES);
    const allMins = entries.map(([, { min }]) => min);
    const allMaxes = entries.map(([, { max }]) => max);

    expect(Math.min(...allMins)).toBe(-100);
    expect(Math.max(...allMaxes)).toBe(100);
  });

  it('each grade has color and bgColor properties', () => {
    for (const [grade, config] of Object.entries(SCORE_GRADES)) {
      expect(config).toHaveProperty('color');
      expect(config).toHaveProperty('bgColor');
      expect(typeof config.color).toBe('string');
      expect(typeof config.bgColor).toBe('string');
    }
  });
});

describe('GRADE_ORDER', () => {
  it('has correct relative ordering (higher grade = higher value)', () => {
    expect(GRADE_ORDER['A+']).toBeGreaterThan(GRADE_ORDER['A']);
    expect(GRADE_ORDER['A']).toBeGreaterThan(GRADE_ORDER['A-']);
    expect(GRADE_ORDER['A-']).toBeGreaterThan(GRADE_ORDER['B+']);
    expect(GRADE_ORDER['B+']).toBeGreaterThan(GRADE_ORDER['B']);
    expect(GRADE_ORDER['B']).toBeGreaterThan(GRADE_ORDER['B-']);
    expect(GRADE_ORDER['B-']).toBeGreaterThan(GRADE_ORDER['C+']);
    expect(GRADE_ORDER['C+']).toBeGreaterThan(GRADE_ORDER['C']);
    expect(GRADE_ORDER['C']).toBeGreaterThan(GRADE_ORDER['C-']);
    expect(GRADE_ORDER['C-']).toBeGreaterThan(GRADE_ORDER['D+']);
    expect(GRADE_ORDER['D+']).toBeGreaterThan(GRADE_ORDER['D']);
    expect(GRADE_ORDER['D']).toBeGreaterThan(GRADE_ORDER['D-']);
    expect(GRADE_ORDER['D-']).toBeGreaterThan(GRADE_ORDER['F']);
  });

  it('includes all 13 grade levels', () => {
    const expectedGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    for (const grade of expectedGrades) {
      expect(GRADE_ORDER).toHaveProperty(grade);
    }
    expect(Object.keys(GRADE_ORDER)).toHaveLength(13);
  });

  it('F has the lowest value', () => {
    const values = Object.values(GRADE_ORDER);
    const minValue = Math.min(...values);
    expect(GRADE_ORDER['F']).toBe(minValue);
  });

  it('A+ has the highest value', () => {
    const values = Object.values(GRADE_ORDER);
    const maxValue = Math.max(...values);
    expect(GRADE_ORDER['A+']).toBe(maxValue);
  });
});
