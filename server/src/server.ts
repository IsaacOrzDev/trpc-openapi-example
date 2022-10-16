import { initTRPC } from '@trpc/server';
import z from 'zod';
import { OpenApiMeta, createOpenApiHttpHandler } from 'trpc-openapi';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';

export const t = initTRPC.meta<OpenApiMeta>().create();

const getUser = t.procedure
  .meta({ openapi: { method: 'GET', path: '/get-user' } })
  .input(z.object({ name: z.string() }))
  .output(z.object({ id: z.string(), name: z.string() }))
  .query((req) => {
    return { id: req.input.name, name: req.input.name };
  });

const createUser = t.procedure
  .input(
    z.object({
      name: z.string().min(5),
    })
  )
  .mutation(async (req) => {
    return req.input;
  });

export const appRouter = t.router({
  getUser,
  createUser,
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST'],
  })
);

app.use('/trpc', createExpressMiddleware({ router: appRouter }));
app.use('/api', createOpenApiHttpHandler({ router: appRouter }));

app.listen(3000);
