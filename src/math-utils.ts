import { FLOATING_POINT_TOLERANCE } from "./constants.js";

const validateTolerance = (tolerance: number): void => {
  if (!Number.isFinite(tolerance) || tolerance < 0) {
    throw new RangeError("Tolerance must be a finite, non-negative number.");
  }
};

/**
 * Returns whether two numbers differ by no more than the absolute tolerance.
 */
const areEffectivelyEqual = (
  a: number,
  b: number,
  tolerance: number = FLOATING_POINT_TOLERANCE,
): boolean => {
  validateTolerance(tolerance);
  return isEffectivelyZero(a - b, tolerance);
};

/**
 * Returns whether a number's absolute value is no greater than the tolerance.
 */
const isEffectivelyZero = (
  num: number,
  tolerance: number = FLOATING_POINT_TOLERANCE,
): boolean => {
  validateTolerance(tolerance);
  return Math.abs(num) <= tolerance;
};

export { areEffectivelyEqual, isEffectivelyZero };
