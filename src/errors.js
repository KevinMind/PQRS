export const errMessages = {
  config: {
    invalidRootPath: path => `invalid rootPath: ${path}`,
    invalidRoutes: routes => `invalid routes: ${routes}`,
    invalidKeyFunc: (type, key) => `invalid key: ${key} of type: ${type}`,
    noConfigArg: 'config Object() required',
  },
  match: {
    // eslint-disable-next-line no-template-curly-in-string
    noMatch: 'no matchFunction provided to parse factory function, expecting func: key => `{{${key}}}`',
  },
  stringify: {
    noPattern: 'no pattern provided to parse function',
    noPlaceHolders: 'no placeholders provided to parse function',
  },
  parse: {
    duplicateId: id => `parameter with key: ${id} already exists in pattern. Cannot duplicate keys, as objects can only contain single key with same name`,
  },
};

export default msg => new Error(msg);
