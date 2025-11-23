import { describe, it, expect } from 'vitest';
import { hello } from '../src/index.js';

describe('hello', () => {
  it('should return a greeting', () => {
    expect(hello('World')).toBe('Hello, World!');
  });
});
