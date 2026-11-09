/**
 * Returns a sorted copy of `data`, comparing strings without case sensitivity,
 * numbers numerically, and dates chronologically. Null and undefined keys stay
 * at the end in either sort direction.
 *
 * All non-null keys must have the same supported type. Unsupported values,
 * invalid dates, and mixed types throw a `TypeError`.
 */
export const sortDataArray = <T>(
  data: T[],
  key: keyof T | ((item: T) => string | number | Date | null | undefined),
  order: "asc" | "desc" = "asc",
) => {
  const entries = data.map((item) => ({
    item,
    value: typeof key === "function" ? key(item) : item[key],
  }));
  let valueType: "string" | "number" | "date" | undefined;

  for (const { value } of entries) {
    if (value == null) {
      continue;
    }

    let currentType: "string" | "number" | "date";
    if (typeof value === "string") {
      currentType = "string";
    } else if (typeof value === "number" && !Number.isNaN(value)) {
      currentType = "number";
    } else if (value instanceof Date && !Number.isNaN(value.getTime())) {
      currentType = "date";
    } else {
      throw new TypeError(
        "Sort keys must be strings, numbers, dates, or nullish values.",
      );
    }

    if (valueType !== undefined && valueType !== currentType) {
      throw new TypeError("All non-null sort keys must have the same type.");
    }
    valueType = currentType;
  }

  entries.sort(({ value: aVal }, { value: bVal }) => {
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    let comparison = 0;
    if (typeof aVal === "string" && typeof bVal === "string") {
      comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      comparison =
        aVal.getTime() < bVal.getTime()
          ? -1
          : aVal.getTime() > bVal.getTime()
            ? 1
            : 0;
    }

    return order === "desc" ? -comparison : comparison;
  });

  return entries.map(({ item }) => item);
};
