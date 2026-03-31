// This module uses a helper that is imported but not re-exported.
// Without the `imports` option, doctest would crash with:
//   TypeError: require(...).double is not a function

import { double } from './sample_math_helper'

/**
 * Adds two numbers then doubles the result.
 * Uses an imported helper (double) that is NOT re-exported.
 * @example
 * addAndDouble(1, 2)
 * //=> 6
 */
export function addAndDouble(a, b) {
  return double(a + b)
}
