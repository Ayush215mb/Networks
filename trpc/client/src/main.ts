import type {AppRouter} from "../../server"
import { createTRPCClient, httpBatchLink } from '@trpc/client';

const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
        }),
    ],
});

async function main() {
    await  client.greeting.query()
    await client.getAllProblems.query()
    await client.updateProblems.mutate({ id: 0, title: "new problem",description:"nothing to see here" });
}
await main()