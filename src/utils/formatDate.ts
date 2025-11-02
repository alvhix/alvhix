/**
 * Formats a date to a localized string
 * @param date - The date to format
 * @returns Formatted date string in format "MMM DD, YYYY"
 */
export function formatDate(date: Date | undefined | null): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
