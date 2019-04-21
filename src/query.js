import matchUrlStringToPattern, { getRegexer } from './match';

const queryPatternAndString = (match) => (pattern, string, key = null) => {
  const regex = getRegexer(match, key);
  const test = regex.exec(pattern);

  const item = { key, value: null, queryMatch: null };

  // no query because urls are not a match.
  if (!matchUrlStringToPattern(match)(pattern, string)) {
    return item;
  }

  if (test && Array.isArray(test)) {
    const [patternMatch] = test;
    const start = test.index;

    // set item key to matching id
    item.queryMatch = patternMatch;

    // no match because start of pattern match does not exist in string
    // ex: pattern = '/documents/:id string = /documents
    if (string.length < start) {
      return item
    }

    // the char 1 index after the end of our matchedString
    const endStringIdx = start + patternMatch.length;

    // our value match goes to the end of the string
    if (pattern.length === endStringIdx) {
      item.value = string.slice(start);
      return item;
    }

    // character in pattern that matches end of valueMatch
    const endStringChar = pattern.charAt(endStringIdx);

    // find endOfStringChar after start in string.
    const endStringMatch = string.slice(start).match(endStringChar);

    // console.log({ pattern, string, patternMatch, key, endStringIdx, endStringChar, endStringMatch });
    // no match because we could not find the ending char in the url
    // ex: pattern /documents/:banana/something string: /documents/something/else/entirely
    if (endStringMatch === null || !Array.isArray(endStringMatch)) {
      return item;
    } else {
      item.value = string.slice(start, endStringMatch.index + start);
      return item;
    }
  }
  return item;
};

export default queryPatternAndString;