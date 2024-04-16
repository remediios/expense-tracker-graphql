import express from 'express';
import { createHandler } from 'graphql-http';
import dotenv from 'dotenv';

import { ruruHTML } from 'ruru/server';

import schema from './schema/schema.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

var root = {
  hello() {
    return 'Hello world!';
  },
};

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(
  port,
  console.log(`
Server is running on port ${port}`)
);
