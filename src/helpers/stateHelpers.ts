export function setArray<T>(
  source: T[],
  index: number,
  value: Partial<T>
): T[] {
  return source.map((v, i) => (i === index ? { ...v, ...value } : v));
}
