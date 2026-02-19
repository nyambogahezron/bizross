import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../";

export const productRoutes = router({
    getProduct: publicProcedure.query(async ({ ctx }) => {
        return {};
    }),
    createProduct: protectedProcedure
        .input(
            z.object({
                name: z.string().min(2).max(100),
                price: z.number().min(0),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return {};
        }),
    updateProduct: protectedProcedure
        .input(
            z.object({
                id: z.string().uuid(),
                name: z.string().min(2).max(100).optional(),
                price: z.number().min(0).optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return {};
        }),
});
