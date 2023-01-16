import { Validate } from './../components/cart/validation';
import { describe, expect, test } from '@jest/globals';

describe('Validation', () => {
  test('is valid Email', () => {
    expect(Validate.isEmail('test@mail.ru')).toBe('');
  });

  test('is not valid Email', () => {
    expect(Validate.isEmail('test.ru')).toBe('Email is not valid');
  });
  test('is valid Card', () => {
    expect(Validate.isCredit('4111 1111 1111 1111')).toBe('');
  });
  test('is not valid month and year', () => {
    expect(Validate.isMMYY('15/20')).toBe('field is not correct');
  });
  test('is valid month and year', () => {
    expect(Validate.isMMYY('12/20')).toBe('');
  });
});
