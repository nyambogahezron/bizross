import { router } from "../";
import { productRoutes } from "./product.routes";

const appRouter = router({
    product: productRoutes,
});

export type AppRouter = typeof appRouter;
