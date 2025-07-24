export function generateRandomNumber(length: number = 6) {
  // Ensure length is between 1 and 32
  const sanitizedLength = Math.min(Math.max(1, length), 32);

  // Use a more reliable method for generating random numbers
  const min = Math.pow(10, sanitizedLength - 1);
  const max = Math.pow(10, sanitizedLength) - 1;

  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
