export const errMessages = {
  noConfigArg: 'config Object() required',
  stringify: {
    noMatch: 'no matchFunction provided to parse factory function, expecting func: key => `{{${key}}}`',
    noPattern: 'no pattern provided to parse function',
    noPlaceHolders: 'no placeholders provided to parse function',
  },
  parse: {
    duplicateId: id => `parameter with key: ${id} already exists in pattern. Cannot duplicate keys, as objects can only contain single key with same name`
  }
};

export default msg => new Error(msg);