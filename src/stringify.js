import Err, { errMessages } from './errors';
import { getMatcher, MASTER_KEY } from './match';

const stringify = (matchFunc) => (pattern, placeholders) => {
  const match = getMatcher(matchFunc);

  if (!pattern || typeof pattern !== 'string') {
    throw Err(errMessages.stringify.noPattern);
  }
  if (!placeholders || Array.isArray(placeholders) || typeof placeholders !== 'object') {
    throw Err(errMessages.stringify.noPlaceHolders);
  }

  return Object.keys(placeholders).reduce(
    (path, key) => path.replace(match.replace(MASTER_KEY, key), placeholders[key]),
    pattern
  );
};

export default stringify;
