import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const authRoutes = router({
	getUsers: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	getUser: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return {};
		}),
	updateUser: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().optional(),
				email: z.string().email().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	deleteUser: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
});
