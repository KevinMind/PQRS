import main from './index';
import { errMessages } from './errors';

const key = key => `:${key}`;

describe('test config', () => {
  it ('should test main with no config argument', () => {
    try {
      main();
      expect(false);
    } catch (e) {
      expect(e.message).toEqual(errMessages.noConfigArg);
    }

  });
  it('should test main config', () => {
    const config = {
      rootPath: '/my-path', // defaults to '',
      key,
      routes: [
        {
          name: 'documents',
          path: '/documents',
          routes: [
            {
              name: 'documentViewById',
              path: '/:id',
            },
            {
              name: 'documentEditById',
              path: '/:id/edit',
            },
          ]
        }
      ]
    };

    const urls = main(config);
    expect(true);
  });
});