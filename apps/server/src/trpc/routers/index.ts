import { router } from "../";
import { customerRoutes } from "./customer.routes";
import { inventoryRoutes } from "./inventory.routes";
import { paymentRoutes } from "./payment.routes";
import { productRoutes } from "./product.routes";
import { salesRoutes } from "./sales.routes";

const appRouter = router({
	customer: customerRoutes,
	inventory: inventoryRoutes,
	payment: paymentRoutes,
	product: productRoutes,
	sales: salesRoutes,
});

export type AppRouter = typeof appRouter;
