import Err, { errMessages } from './errors';

export const MASTER_KEY = 'key';

export const getRegexer = (match, query) => new RegExp(match.replace(MASTER_KEY, query));

export const getWildCardMatch = match => RegExp(`${match.replace(MASTER_KEY, '(.*?)')}(?=\\/|$)`);

export const getMatcher = (matchFunc) => {
  if (!matchFunc || typeof matchFunc !== 'function') {
    throw Err(errMessages.match.noMatch);
  }
  return matchFunc(MASTER_KEY);
};

const urlStringToArr = url => url.split('/');

const matchUrlStringToPattern = match => (pattern, string) => {
  const patt = urlStringToArr(pattern);
  const strr = urlStringToArr(string);
  const wildcard = getWildCardMatch(match);

  // not match because not same length
  // TODO: decide if urls with extra or missing trailing / should pass or fail a match test
  // it seems that if pattern defines without, the string should also so it should fail.
  if (patt.length !== strr.length) {
    return false;
  }

  for (let i = 0; i < string.length; i += 1) {
    const branch = strr[i];
    const patBranch = patt[i];

    const isWild = Array.isArray(wildcard.exec(patBranch));
    const isEqual = branch === patBranch;

    // if is not equal and not wild return false
    if (!isEqual && !isWild) {
      return false;
    }
  }
  return true;
};

export default matchUrlStringToPattern;
