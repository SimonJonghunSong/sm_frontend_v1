export function splitArrayIntoChunks<T>(array: T[], chunkSize = 20) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result as T[][];
}
