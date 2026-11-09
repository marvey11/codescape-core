/**
 * Parses a number string using a heuristic for English-like and German-like
 * separators. Ambiguous single-separator values follow the heuristic; use
 * `parseLocaleNumber` with an explicit locale when certainty is required.
 *
 * @param numberString The number string to parse.
 * @returns The parsed number, or `NaN` if parsing fails.
 */
const parseNumberWithAutoLocale = (numberString: string): number =>
  parseLocaleNumber(numberString, detectNumberLocale(numberString));

/**
 * Parses an ASCII-digit number string using locale-specific separators and
 * grouping rules.
 * Grouping and decimal separators must follow the locale; malformed input
 * returns `NaN`.
 *
 * @param numberString The number string to parse (for example, "1.234,56" for
 * `de-DE` or "1,234.56" for `en-GB`).
 * @param locale The locale used to determine separators and grouping rules.
 * @returns The parsed number, or `NaN` if parsing fails.
 */
const parseLocaleNumber = (numberString: string, locale: string): number => {
  const formatter = new Intl.NumberFormat(locale);
  const parts = formatter.formatToParts(123456789012345.6);
  const decimalSeparator = parts.find((part) => part.type === "decimal")?.value;
  const groupSeparator = parts.find((part) => part.type === "group")?.value;
  const minusSign =
    new Intl.NumberFormat(locale, { useGrouping: false })
      .formatToParts(-1)
      .find((part) => part.type === "minusSign")?.value ?? "-";

  let value = numberString.trim();
  let sign = "";
  if (value.startsWith(minusSign) || value.startsWith("-")) {
    sign = "-";
    value = value.slice(value.startsWith(minusSign) ? minusSign.length : 1);
  } else if (value.startsWith("+")) {
    value = value.slice(1);
  }

  const decimalParts = decimalSeparator
    ? value.split(decimalSeparator)
    : [value];
  if (decimalParts.length > 2) {
    return Number.NaN;
  }

  const [integerPart, fractionPart] = decimalParts;
  if (
    !integerPart ||
    (fractionPart !== undefined && !/^\d+$/.test(fractionPart))
  ) {
    return Number.NaN;
  }

  let integerDigits = integerPart;
  if (groupSeparator && integerPart.includes(groupSeparator)) {
    const groups = integerPart.split(groupSeparator);
    const integerParts = parts
      .filter((part) => part.type === "integer")
      .map((part) => part.value.length);
    const primaryGroupSize = integerParts[integerParts.length - 1];
    const secondaryGroupSize =
      integerParts[integerParts.length - 2] ?? primaryGroupSize;

    if (
      !primaryGroupSize ||
      !secondaryGroupSize ||
      groups[0] === undefined ||
      groups[0].length < 1 ||
      groups[0].length > secondaryGroupSize ||
      groups
        .slice(1, -1)
        .some((group) => group.length !== secondaryGroupSize) ||
      groups[groups.length - 1]?.length !== primaryGroupSize ||
      groups.some((group) => !/^\d+$/.test(group))
    ) {
      return Number.NaN;
    }

    integerDigits = groups.join("");
  } else if (!/^\d+$/.test(integerPart)) {
    return Number.NaN;
  }

  const parsedValue = Number(
    `${sign}${integerDigits}${fractionPart === undefined ? "" : `.${fractionPart}`}`,
  );
  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN;
};

/**
 * Detects English-like or German-like punctuation. Single-separator values can
 * be ambiguous; use `parseLocaleNumber` for an explicit locale.
 */
function detectNumberLocale(numberString: string): "en-GB" | "de-DE" {
  const hasComma = numberString.includes(",");
  const hasDot = numberString.includes(".");

  if (!hasComma && !hasDot) {
    return "en-GB";
  }

  if (hasComma && !hasDot) {
    return "de-DE";
  }

  if (!hasComma && hasDot) {
    return "en-GB";
  }

  return numberString.lastIndexOf(",") > numberString.lastIndexOf(".")
    ? "de-DE"
    : "en-GB";
}

/**
 * Rounds a value to two decimal places using `Math.round`.
 */
const roundCurrency = (value: number): number => Math.round(value * 100) / 100;

export { parseLocaleNumber, parseNumberWithAutoLocale, roundCurrency };
