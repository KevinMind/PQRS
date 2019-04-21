import Err, { errMessages } from './errors';
import { getMatcher } from './match';
import stringifyPatternFromPlaceholders from './stringify';
import parseStringToObject from './parse';
import queryPatternAndString from './query';

const defaultConfig = {
  rootPath: '',
  key: key => `:${key}`,
  routes: [],
};

const getUrlConfig = (regex, match) => {
  const stringify = stringifyPatternFromPlaceholders(match);
  const parse = parseStringToObject(match);
  const query = queryPatternAndString(match);

  return {
    parse: url => parse(regex, url),
    query: (url, queryId) => query(regex, url, queryId),
    regex,
    stringify: placeholders => stringify(regex, placeholders),
  };
};

const main = (config) => {
  if (!config) {
    throw Err(errMessages.config.noConfigArg);
  }

  // merge default and user config;
  const options = {
    ...defaultConfig,
    ...config,
  };

  if (!options.rootPath instanceof String || typeof options.rootPath !== 'string') {
    throw Err(errMessages.config.invalidRootPath(options.rootPath));
  }

  if (!options.routes || !Array.isArray(options.routes)) {
    throw Err(errMessages.config.invalidRoutes(options.routes));
  }

  if (!options.key || typeof options.key !== 'function') {
    throw Err(errMessages.config.invalidKeyFunc(typeof options.key, options.key));
  }

  const result = {};
  const match = getMatcher(options.key);

  // for each route in routes, generate url config object, recursively
  if (options.routes.length) {
    options.routes.forEach(({ name, path, routes }) => {
      const rootPath = `${options.rootPath}${path}`;
      const root = getUrlConfig(rootPath, match);

      if (routes && Array.isArray(routes)) {
        result[name] = {
          root,
          ...main({ ...options, routes, rootPath }),
        };
      } else {
        result[name] = root;
      }
    });
  }
  return result;
};

export default main;
