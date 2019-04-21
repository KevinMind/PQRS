import matchUrlStringToPattern, { getRegexer } from './match';

const getItemConfig = (key, value = null, queryMatch = null) => ({
  key,
  value,
  queryMatch,
});

const queryPatternAndString = match => (pattern, string, key = null) => {
  // TODO: decide if we should handle loose types, right now, everything is a string..
  // we could theoretically handle numbers/strings/maybe dates/ idk...
  const regex = getRegexer(match, key);
  const test = regex.exec(pattern);

  // no query because urls are not a match.
  if (!matchUrlStringToPattern(match)(pattern, string)) {
    return getItemConfig(key);
  }

  if (test && Array.isArray(test)) {
    const [patternMatch] = test;
    const start = test.index;

    // no match because start of pattern match does not exist in string
    // ex: pattern = '/documents/:id string = /documents
    if (string.length < start) {
      return getItemConfig(key, null, patternMatch);
    }

    // the char 1 index after the end of our matchedString
    const endStringIdx = start + patternMatch.length;

    // our value match goes to the end of the string
    if (pattern.length === endStringIdx) {
      return getItemConfig(key, string.slice(start), patternMatch);
    }

    // character in pattern that matches end of valueMatch
    const endStringChar = pattern.charAt(endStringIdx);

    // find endOfStringChar after start in string.
    const endStringMatch = string.slice(start).match(endStringChar);

    // no match because we could not find the ending char in the url
    // ex: pattern /documents/:banana/something string: /documents/something/else/entirely
    if (endStringMatch === null || !Array.isArray(endStringMatch)) {
      return getItemConfig(key, null, patternMatch);
    }
    return getItemConfig(key, string.slice(start, endStringMatch.index + start), patternMatch);
  }
  return getItemConfig(key);
};

export default queryPatternAndString;
