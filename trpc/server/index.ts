import express,{Request,Response} from 'express';
import {initTRPC} from "@trpc/server"
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

const t= initTRPC.create()

let problems: Problem[] = [
    {
        id: 0,
        title: "Polyfill of Array.map",
        description: "Some description",
    },
    {
        id: 1,
        title: "Polyfill of Promise.all()",
        description: "Some description",
    }
];
type Problem = {
    id: number,
    title: string,
    description: string,

}
export const router = t.router
export const publicProcedure = t.procedure

const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v10!'),
    getAllProblems: publicProcedure.query(() => problems),
    updateProblems: publicProcedure.input((v)=>{
        if (typeof v !== "object" || v === null) {
            throw new Error("Object expected");
        }
        return v as Problem;
    })
        .mutation(async ({input}) => {
            const data = input as Problem;
            problems = problems.map((p) => {
                if (p.id === data.id) {
                    return { ...p, ...data };
                }
                return p;
            });
        }),
});

app.use(cors());
app.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
    }),
);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;