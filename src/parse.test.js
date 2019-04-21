import getParser from './parse';
import { getMatcher } from './match';
import { errMessages } from './errors';

const getMatch = key => `{{${key}}}`;

const match = getMatcher(getMatch);

describe('parse', () => {
  it ('should fail with duplicate param key', () => {
    const pattern = '/documents/{{id}}/{{banana}}/{{banana}}';
    const string = '/documents/234/my-document/banana';

    try {
      getParser(match)(pattern, string);
    } catch (e) {
      expect(e.message).toEqual(errMessages.parse.duplicateId('banana'));
    }
  });

  it('should test parser', () => {
    const pattern = '/documents/{{id}}/{{banana}}/{{apple}}';
    const string = '/documents/234/banana/apple';
    const parsed = getParser(match)(pattern, string);

    expect(parsed.banana).toEqual('banana');
    expect(parsed.apple).toEqual('apple');
    expect(parsed.id).toEqual('234');
  });

  it('should test parser with no values returned', () => {
    const pattern = '/documents/{{id}}/{{banana}}/{{apple}}';
    const string = '/documents';
    const parsed = getParser(match)(pattern, string);

    expect(parsed).toEqual(null);
  });

  it('should fail as pattern doesn"t match string', () => {
    const pattern = '/documents/{{id}}/else/{{banana}}';
    const string =  '/somethign/do/else/234';
    const parsed = getParser(match)(pattern, string);
    expect(parsed).toEqual(null);
  })

});