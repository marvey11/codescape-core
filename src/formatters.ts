/**
 * Formats a number as currency, defaulting to EUR and the `en-GB` locale.
 *
 * @param value The amount to format.
 * @param locale The formatting locale.
 * @param currency The ISO 4217 currency code.
 */
const formatCurrency = (
  value: number,
  locale = "en-GB",
  currency = "EUR",
): string =>
  Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

/**
 * Formats a decimal value as a percentage using the requested fraction digits.
 */
const formatPercent = (
  value: number,
  fractionDigits = 2,
  locale = "en-GB",
): string =>
  Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

const normalizedDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
};

/**
 * Formats a date, which should represent a normalized UTC calendar day.
 * Without a locale, returns `YYYY-MM-DD`.
 */
const formatNormalizedDate = (
  date: Date,
  locale?: string | undefined,
): string =>
  locale
    ? Intl.DateTimeFormat(locale, normalizedDateFormatOptions).format(date)
    : date.toISOString().substring(0, 10);

export { formatCurrency, formatNormalizedDate, formatPercent };
