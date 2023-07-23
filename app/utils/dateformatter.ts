/**
 * Formats a date string into a human-readable format.
 *
 * The function takes a date string and returns it in the format: Month Day, Year.
 *
 * @param {string} date - The date string to be formatted. It should be in a format supported by the Date constructor.
 * @returns {string} - A formatted date string in the format: Month Day, Year.
 *
 * @example
 * const formattedDate = formatDate("2023-07-22");
 * console.log(formattedDate); // Output: "July 22, 2023"
 *
 * @example
 * const formattedDate = formatDate("2023-12-31");
 * console.log(formattedDate); // Output: "December 31, 2023"
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}
