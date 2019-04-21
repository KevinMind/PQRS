import getStringifier from './stringify';
import { getMatcher } from './match';
import { errMessages } from './errors';

const getKey = key => `:${key}`;

const match = getMatcher(getKey);

describe('stringify', () => {
  it('should stringifyPatternFromPlaceholders pattern and placeholders', () => {
    const stringify = getStringifier(match);
    const pattern = '/documents/:id';

    const string = stringify(pattern, { id: 3 });
    expect(string).toEqual('/documents/3');
  });

  it('should fail, no pattern', () => {
    try {
      getStringifier(match)();
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPattern);
    }
  });

  it('should fail, invalid pattern', () => {
    try {
      getStringifier(match)(3);
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPattern);
    }
  });

  it('should fail no placeholders', () => {
    try {
      getStringifier(match)('/some/placeholder');
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPlaceHolders);
    }
  });

  it('should fail invalid placeholders', () => {
    try {
      getStringifier(match)('/some/placeholder', [3, 2, 3]);
    } catch (e) {
      expect(e.message).toEqual(errMessages.stringify.noPlaceHolders);
    }
  });
});
