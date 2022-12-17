import { assocEnumToArray } from './assoc-enum-to-array.function';

describe('assoc-enum-to-array.function', () => {

  it('should create array from assoc enum', () => {
    enum AssocEnum {
      option1 = 'option1',
      option2 = 'option2',
      option3 = 'option3',
    }

    const result = assocEnumToArray<AssocEnum>(AssocEnum);
    expect(result.length).toBe(3);
    expect(result.some(option => option === 'option1')).toBeTruthy();
    expect(result.some(option => option === 'option2')).toBeTruthy();
    expect(result.some(option => option === 'option3')).toBeTruthy();
  });
});
