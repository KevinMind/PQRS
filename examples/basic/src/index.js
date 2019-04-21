import createConfig from 'pqrs';
import express from 'express';
import axios from 'axios';

const app = express();

const routes = createConfig({
  routes: [
    {
      name: 'documents',
      path: '/documents',
      routes: [
        {
          name: 'singleDocument',
          path: '/:id',
          routes: [
            {
              name: 'viewDocument',
              path: '/view',
            },
          ]
        }
      ]
    }
  ]
});

const response = ({ query, params, originalUrl }, res) => res.json(({ query, params, originalUrl }));

app.get(routes.documents.root.regex, response);
app.get(routes.documents.singleDocument.root.regex, response);
app.get(routes.documents.singleDocument.viewDocument.regex, response);

const main = app => new Promise((resolve, reject) => {
  app.listen(3000, (err) => {
    if (err) {
      reject(err);
    } else {
      console.log('server listening on port', 3000);
      resolve();
    }
  });
});

const requests = [
  routes.documents.root.stringify(),
  routes.documents.singleDocument.root.stringify({ id: 3 }),
  routes.documents.singleDocument.viewDocument.stringify({ id: 3 }),
];

// start app
main(app)
  .then(() => requests.forEach(path => console.log(`http://localhost:3000${path}`)));




