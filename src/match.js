import Err, { errMessages } from './errors';

export const MASTER_KEY = 'key';

// TODO: start here
export const isRegexMatcher = match => () => {
  console.log(match);
};

export const getWildCardMatch = match => getRegexer(match, '(.*?)');

export const getRegexer = (match, query) => {
  return new RegExp(match.replace(MASTER_KEY, query));
};

export const getMatcher = matchFunc => {
  if (!matchFunc || typeof matchFunc !== 'function') {
    throw Err(errMessages.stringify.noMatch);
  }
  return matchFunc(MASTER_KEY);
};

const urlStringToArr = url => url.split('/');

const matchUrlStringToPattern = (match) => (pattern, string) => {
  const patt = urlStringToArr(pattern);
  const strr = urlStringToArr(string);
  const wildcard = getWildCardMatch(match);

  // not match because not same length
  if (patt.length !== strr.length) {
    return false;
  }

  for (let i = 0; i < string.length; i ++) {
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