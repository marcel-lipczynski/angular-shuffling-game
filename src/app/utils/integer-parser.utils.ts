export const parseStringToInt = (str: string): number => {
  if (str.toLowerCase() === 'n/a' || str === '') {
    return 0;
  }

  const cleanedStr = str.replace(/,/g, ''); // Remove all commas
  return parseInt(cleanedStr, 10); // Convert to an integer
};

export const compareStrings = (str1 = '', str2 = '') => {
  const value1 = parseStringToInt(str1);
  const value2 = parseStringToInt(str2);

  if (value1 > value2) return 1;
  else if (value1 < value2) return 0;
  else return -1;
};
