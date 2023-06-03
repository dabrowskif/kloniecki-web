import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { env } from "~/env.mjs";
import type { AppRouter } from "~/server/api/root";

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_FRONTEND_URL}/api/trpc`,
    }),
  ],
  transformer: SuperJSON,
});

export const getTrpcClient = () => trpcClient;
