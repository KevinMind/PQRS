import path from 'path';

const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);

export default {
  PROJECT_SRC: resolveApp('src'),
  PROJECT_NAME: 'pqrs',
  PROJECT_BUILD: resolveApp('build'),
  MODE: process.env.NODE_ENV,
};