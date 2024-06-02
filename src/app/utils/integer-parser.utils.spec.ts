import { compareStrings, parseStringToInt } from './integer-parser.utils';

describe('parseStringToInt', () => {
  it('should parse valid strings to integers', () => {
    expect(parseStringToInt('123')).toBe(123);
    expect(parseStringToInt('1,234')).toBe(1234);
  });

  it('should return 0 if input string is "n/a"', () => {
    expect(parseStringToInt('n/a')).toBe(0);
    expect(parseStringToInt('N/A')).toBe(0);
  });

  it('should return NaN if input string is not a valid number', () => {
    expect(parseStringToInt('abc')).toBeNaN();
  });
});

describe('compareStrings', () => {
  it('should return 1 if str1 is greater than str2', () => {
    expect(compareStrings('10', '5')).toBe(1);
    expect(compareStrings('1,000', '999')).toBe(1);
    expect(compareStrings('999', 'n/a')).toBe(1);
  });

  it('should return 0 if str1 is less than str2', () => {
    expect(compareStrings('5', '10')).toBe(0);
    expect(compareStrings('999', '1,000')).toBe(0);
    expect(compareStrings('n/a', '999')).toBe(0);
  });

  it('should return -1 if str1 is equal to str2', () => {
    expect(compareStrings('5', '5')).toBe(-1);
    expect(compareStrings('1,000', '1,000')).toBe(-1);
    expect(compareStrings('n/a', 'n/a')).toBe(-1);
  });
});
