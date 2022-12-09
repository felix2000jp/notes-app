import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const authRoutes = async (app: FastifyInstance): Promise<void> => {
	// Sign Up Route
	app.post("/signup", { schema: Contracts.SignUp }, Controllers.SignUp);

	// Sign In Route
	app.post("/signin", { schema: Contracts.SignIn }, Controllers.SignIn);
};

export default authRoutes;
