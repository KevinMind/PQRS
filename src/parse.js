import Err, { errMessages } from './errors';
import query from './query';
import matchUrlStringToPattern, { getWildCardMatch } from './match';

const parseStringToObject = match => (pattern, string, result = {}) => {
  const obj = { ...result };
  const querier = query(match);

  // urls are not match so return null;
  // TODO: figure out if it's best to return null or throw error... not sure
  if (!matchUrlStringToPattern(match)(pattern, string)) {
    return null;
  }

  const regex = getWildCardMatch(match);
  const test = regex.exec(pattern);

  if (test && Array.isArray(test)) {
    // query first match from pattern catch all
    const { key, value, queryMatch } = querier(pattern, string, test[1]);

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      throw Err(errMessages.parse.duplicateId(key));
    }

    // set item to result object
    obj[key] = value;

    // replace regex from pattern for next iteration
    const newPattern = pattern.replace(queryMatch, value);

    // recurse to get additional values from pattern
    return parseStringToObject(match)(newPattern, string, obj);
  }

  // return object
  return obj;
};

export default parseStringToObject;
