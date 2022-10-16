import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from './server';

import jsYaml from 'js-yaml';
const FileSystem = require('fs');

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'tRPC OpenAPI',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000',
});

FileSystem.writeFile(
  'openapi.yml',
  jsYaml.dump(openApiDocument),
  (error: any) => {
    if (error) throw error;
  }
);
