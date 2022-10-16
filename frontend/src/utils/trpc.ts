import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../../../server/src/server';

export const trpc = createTRPCReact<AppRouter>();
