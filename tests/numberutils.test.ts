import { describe, expect, it } from "vitest";
import {
  parseLocaleNumber,
  parseNumberWithAutoLocale,
  roundCurrency,
} from "../src/index.js";

describe("Test Suite for numberutils", () => {
  describe("Test Suite for parseNumberWithAutoLocale", () => {
    it("should pass basic tests", () => {
      expect(parseNumberWithAutoLocale("1,300.00")).toStrictEqual(1300);
      expect(parseNumberWithAutoLocale("1.300,00")).toStrictEqual(1300);

      expect(parseNumberWithAutoLocale("1.300.000,50")).toStrictEqual(
        1300000.5,
      );
      expect(parseNumberWithAutoLocale("1,300,000.50")).toStrictEqual(
        1300000.5,
      );

      expect(parseNumberWithAutoLocale("123,45")).toStrictEqual(123.45);
      expect(parseNumberWithAutoLocale("123.45")).toStrictEqual(123.45);

      expect(parseNumberWithAutoLocale("42")).toStrictEqual(42);

      expect(parseNumberWithAutoLocale("-1.234,56")).toStrictEqual(-1234.56);
      expect(parseNumberWithAutoLocale("-1,234.56")).toStrictEqual(-1234.56);

      expect(parseNumberWithAutoLocale("0,5")).toStrictEqual(0.5);
      expect(parseNumberWithAutoLocale("0.5")).toStrictEqual(0.5);

      expect(parseNumberWithAutoLocale("invalid")).toStrictEqual(NaN);
    });
  });

  describe("Test Suite for parseLocaleNumber", () => {
    it("should pass basic tests", () => {
      expect(parseLocaleNumber("1.300,00", "de-DE")).toStrictEqual(1300);
      expect(parseLocaleNumber("1,300.00", "en-GB")).toStrictEqual(1300);

      expect(parseLocaleNumber("1.300.000,50", "de-DE")).toStrictEqual(
        1300000.5,
      );
      expect(parseLocaleNumber("1,300,000.50", "en-GB")).toStrictEqual(
        1300000.5,
      );

      expect(parseLocaleNumber("123,45", "de-DE")).toStrictEqual(123.45);
      expect(parseLocaleNumber("123.45", "en-GB")).toStrictEqual(123.45);

      expect(parseLocaleNumber("42", "de-DE")).toStrictEqual(42);
      expect(parseLocaleNumber("42", "en-GB")).toStrictEqual(42);

      expect(parseLocaleNumber("-1.234,56", "de-DE")).toStrictEqual(-1234.56);
      expect(parseLocaleNumber("-1,234.56", "en-GB")).toStrictEqual(-1234.56);

      expect(parseLocaleNumber("invalid", "de-DE")).toBeNaN();
    });

    it("should reject malformed grouping and decimal separators", () => {
      expect(parseLocaleNumber("12,34.56", "en-GB")).toBeNaN();
      expect(parseLocaleNumber("1,23,4", "en-GB")).toBeNaN();
      expect(parseLocaleNumber("1.234.56", "en-GB")).toBeNaN();
      expect(parseLocaleNumber("123.", "en-GB")).toBeNaN();
      expect(parseLocaleNumber(".5", "en-GB")).toBeNaN();
      expect(parseLocaleNumber("", "en-GB")).toBeNaN();
      expect(parseLocaleNumber("9".repeat(400), "en-GB")).toBeNaN();
    });

    it("should support signs, whitespace, and locale-specific grouping sizes", () => {
      expect(parseLocaleNumber(" -1,234.50 ", "en-GB")).toBe(-1234.5);
      expect(parseLocaleNumber("+42", "en-GB")).toBe(42);
      expect(parseLocaleNumber("12,34,567.89", "en-IN")).toBe(1234567.89);
    });
  });

  describe("Test Suite for roundCurrency", () => {
    it("should round to two decimal places", () => {
      expect(roundCurrency(12.345)).toBe(12.35);
      expect(roundCurrency(12.344)).toBe(12.34);
      expect(roundCurrency(-12.345)).toBe(-12.34);
    });
  });
});
