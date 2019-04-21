import Err, { errMessages } from './errors';
import { getRegexer } from './match';

const stringifyPatternFromPlaceholders = match => (pattern, placeholders) => {
  if (!pattern || typeof pattern !== 'string') {
    throw Err(errMessages.stringify.noPattern);
  }
  if (!placeholders || Array.isArray(placeholders) || typeof placeholders !== 'object') {
    throw Err(errMessages.stringify.noPlaceHolders);
  }

  return Object.keys(placeholders).reduce(
    (path, key) => path.replace(getRegexer(match, key), placeholders[key]),
    pattern,
  );
};

export default stringifyPatternFromPlaceholders;
