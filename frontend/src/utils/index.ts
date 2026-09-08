export function bytesToGB(bytes: number, decimals: number = 2): number {
  if (bytes === 0) return 0;

  const gb = bytes / Math.pow(1024, 3);
  return parseFloat(gb.toFixed(decimals));
}
