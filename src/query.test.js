import { getMatcher } from './match';
import queryStringFromPatternById from './query';

const match = getMatcher(key => `:${key}`);

describe('query', () => {
  it('should query', () => {
    const pattern = '/documents/:id';
    const string = '/documents/234';
    const queryId = 'id';

    const querier = queryStringFromPatternById(match);

    const id = querier(pattern, string, queryId);
    expect(id.queryMatch).toEqual(':id');
    expect(id.value).toEqual('234');
    expect(id.key).toEqual('id');
  });
  it('should return null', () => {
    const pattern = '/documents/:id/else';
    const string =  '/somethign/do/else';
    const queryId = 'id';

    const querier = queryStringFromPatternById(match);

    const id = querier(pattern, string, queryId);
    expect(id.queryMatch).toEqual(null);
    expect(id.value).toEqual(null);
    expect(id.key).toEqual('id');
  });

  it('should return null', () => {
    const pattern = '/documents/:id/else/:another';
    const string =  '/documents/234/else/456';
    const queryId = 'id';
    const querier = queryStringFromPatternById(match);

    const id = querier(pattern, string, queryId);
    expect(id.queryMatch).toEqual(':id');
    expect(id.value).toEqual('234');
    expect(id.key).toEqual('id');
  });


});