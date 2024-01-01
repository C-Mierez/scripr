import { createTRPCRouter, publicProcedure } from "../trpc";
import { LogInSchema, SignUpSchema } from "schemas";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
    logIn: publicProcedure.input(LogInSchema).mutation(async ({ input }) => {
        // Mock api random result
        const randomResult = Math.random() > 0.5;
        // if (!randomResult) {
        //     throw new TRPCError({
        //         code: "INTERNAL_SERVER_ERROR",
        //         message: `Test error`,
        //     });
        // }
        return {
            result: randomResult,
        };
    }),
    signUp: publicProcedure.input(SignUpSchema).mutation(async ({ input }) => {
        // Mock api random result
        const randomResult = Math.random() > 0.5;
        // if (!randomResult) {
        //     throw new TRPCError({
        //         code: "INTERNAL_SERVER_ERROR",
        //         message: `Test error`,
        //     });
        // }
        console.log(input);
        return {
            result: randomResult,
        };
    }),
});
