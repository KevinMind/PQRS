import Err, { errMessages } from './errors';

const defaultConfig = {
  rootPath: '',
  key: key => `:${key}`,
  routes: [],
};

const main = (config) => {
  if (!config) {
    throw Err(errMessages.noConfigArg);
  }

  const { routes, rootPath, key } = {
    ...defaultConfig,
    ...config,
  };

  if (!rootPath) {
    throw Err(`invalid root path ${rootPath}`);
  }

  if (!routes || !Array.isArray(routes)) {
    throw Err(`invalid routes: ${routes}`);
  }

  if (!key || typeof key !== 'function') {
    throw Err(`invalid key: ${key}`);
  }

  return {
    rootPath,
    routes,
    key,
  };
};

export default main;
