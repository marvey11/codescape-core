import { describe, expect, it } from "vitest";
import { areEffectivelyEqual, isEffectivelyZero } from "../src/index.js";

describe("Test Suite for math-utils", () => {
  describe("Test Suite for areEffectivelyEqual", () => {
    it("should pass basic tests", () => {
      expect(areEffectivelyEqual(1, 1)).toStrictEqual(true);
      expect(areEffectivelyEqual(1, 1.0000001)).toStrictEqual(true);
      expect(areEffectivelyEqual(-1, -1.0000001)).toStrictEqual(true);
    });

    it("should reject invalid tolerances", () => {
      expect(() => areEffectivelyEqual(1, 1, -1)).toThrow(RangeError);
      expect(() => areEffectivelyEqual(1, 1, Number.POSITIVE_INFINITY)).toThrow(
        RangeError,
      );
    });
  });

  describe("Test Suite for isEffectivelyZero", () => {
    it("should pass basic tests", () => {
      expect(isEffectivelyZero(0)).toStrictEqual(true);
      expect(isEffectivelyZero(1)).toStrictEqual(false);
      expect(isEffectivelyZero(-1)).toStrictEqual(false);
      expect(isEffectivelyZero(0.0000000000000001 / 2)).toStrictEqual(true);
      expect(isEffectivelyZero(-0.0000000000000001 / 2)).toStrictEqual(true);
    });

    it("should reject negative and non-finite tolerances", () => {
      expect(() => isEffectivelyZero(0, -0.1)).toThrow(RangeError);
      expect(() => isEffectivelyZero(0, Number.NaN)).toThrow(RangeError);
    });
  });
});
