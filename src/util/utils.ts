export function utcify(date: string): Date {
  return new Date(`${date} UTC`);
}
