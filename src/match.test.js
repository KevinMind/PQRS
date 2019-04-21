import match, { getMatcher } from './match';

const matchFunc = key => `{{${key}}}`;

const testMatch = (pattern, string) => {
  const matcher = match(getMatcher(matchFunc));
  return matcher(pattern, string);
};

describe('matchUrlStringToPattern', () => {
  it('should test match', () => {
    const pattern = '/documents';
    const string = '/documents';
    const result = testMatch(pattern, string);
    expect(result).toEqual(true);
  });

  it('should fail not root match', () => {
    const pattern = '/shop';
    const string = '/documents';
    const result = testMatch(pattern, string);
    expect(result).toEqual(false);
  });

  it('should fail not nested match', () => {
    const pattern = '/documents/all';
    const string = '/documents/234';
    const result = testMatch(pattern, string);
    expect(result).toEqual(false);
  });

  it('should fail deep nested', () => {
    const pattern = '/documents/234/deep';
    const string = '/documents/234/nested';
    const result = testMatch(pattern, string);
    expect(result).toEqual(false);
  });

  it('should test match with param', () => {
    const pattern = '/documents/{{param}}';
    const string = '/documents/234';
    const result = testMatch(pattern, string);
    expect(result).toEqual(true);
  });

  it('should test match with deep param', () => {
    const pattern = '/documents/all/{{id}}/match';
    const string = '/documents/all/234/match';
    const result = testMatch(pattern, string);
    expect(result).toEqual(true);
  });
});