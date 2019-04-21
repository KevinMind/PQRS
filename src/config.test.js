import main from './config';
import { errMessages } from './errors';

describe('test config', () => {
  it('should fail with invalid rootPath', () => {
    try {
      main({ rootPath: 3 });
    } catch (e) {
      expect(e.message).toEqual(errMessages.config.invalidRootPath(3));
    }
  });
  it('shoudl pass with vlaid rootPath', () => {
    const config = main({ rootPath: '/my-root' });
    expect(config);
  });
  it('should fail with invalid routes', () => {
    try {
      main({ routes: {} });
    } catch (e) {
      expect(e.message).toEqual(errMessages.config.invalidRoutes({}));
    }
  });
  it('should test main with no config argument', () => {
    try {
      main();
      expect(false);
    } catch (e) {
      expect(e.message).toEqual(errMessages.config.noConfigArg);
    }
  });
  it('should test large, nested, config', () => {
    const config = main({
      rootPath: '/my-path', // defaults to '',
      routes: [
        {
          name: 'base',
          path: '/base/:config',
        },
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
          ],
        },
        {
          name: 'shop',
          path: '/shop',
          routes: [
            {
              name: 'shopCategory',
              path: '/:categroyId',
              routes: [
                {
                  name: 'viewItemByCategoryAndId',
                  path: '/:productId',
                },
                {
                  name: 'viewCategorySale',
                  path: '/sale',
                },
              ],
            },
          ],
        },
      ],
    });
    expect(config.base);
    expect(config.documents);
    expect(config.documents.documentViewById);
    expect(config.documents.documentEditById);
    expect(config.shop);
    expect(config.shop.shopCategory);
    expect(config.shop.shopCategory.viewItemByCategorAndId);
    expect(config.shop.shopCategory.viewCategorySale);
  });

  it('should add basepath to urls', () => {
    const config = main({
      routes: [
        {
          name: 'documents',
          path: '/documents',
          routes: [
            {
              name: 'docId',
              path: '/:id',
            },
          ],
        }],
      rootPath: '/not-empty-root',
    });
    expect(config.documents.root.regex).toEqual('/not-empty-root/documents');
    expect(config.documents.docId.regex).toEqual('/not-empty-root/documents/:id');
  });

  it('should parse correctly', () => {
    const config = main({ routes: [{ name: 'documents', path: '/documents/:id' }] });
    const parsed = config.documents.parse('/documents/234');
    expect(parsed.id).toEqual('234');
  });

  it('should use custome key pattern', () => {
    const config = main({
      routes: [
        {
          name: 'documents',
          path: '/documents/{{id}}',
        },
      ],
      key: key => `{{${key}}}`,
    });
    expect(config.documents.regex).toEqual('/documents/{{id}}');
    expect(config.documents.stringify({ id: 3 })).toEqual('/documents/3');
    expect(config.documents.parse('/documents/3')).toEqual({ id: '3' });
    expect(config.documents.query('/documents/3', 'id')).toEqual({ value: '3', key: 'id', queryMatch: '{{id}}' });
  });
});
