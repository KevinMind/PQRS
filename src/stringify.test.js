import getStringifier from './stringify';
import { errMessages } from './errors';

const getKey = key => `:${key}`;

describe('stringify', () => {
  it('should stringify pattern and placeholders', () => {
    const stringify = getStringifier(getKey);
    const pattern = '/documents/:id';

    const string = stringify(pattern, { id: 3 });
    expect(string).toEqual('/documents/3');
  });

  it('should fail, matchFunction not a function', () => {
    try {
      getStringifier('notAFunction');
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noMatch);
    }
  });

  it('should fail, no match', () => {
    try {
      getStringifier();
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noMatch);
    }
  });

  it('should fail, no pattern', () => {
    try {
      getStringifier(getKey)();
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPattern);
    }
  });

  it('should fail, invalid pattern', () => {
    try {
      getStringifier(getKey)(3);
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPattern);
    }
  });

  it('should fail no placeholders', () => {
    try {
      getStringifier(getKey)('/some/placeholder');
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPlaceHolders);
    }
  });

  it('should fail invalid placeholders', () => {
    try {
      getStringifier(getKey)('/some/placeholder', [3, 2, 3]);
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPlaceHolders);
    }
  });
});