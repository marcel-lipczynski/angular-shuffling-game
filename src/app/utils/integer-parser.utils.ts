export const parseStringToInt = (str: string): number => {
  const cleanedStr = str.replace(/,/g, ''); // Remove all commas
  return parseInt(cleanedStr, 10); // Convert to an integer
};
