import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const userRoutes = async (app: FastifyInstance) => {
	// Get Signed In User Info

	// Delete Signed In User
	app.delete(
		"/",
		{ preHandler: app.verifyJWT as any, schema: Contracts.DeleteSignedInUserSchema },
		Controllers.deleteSignInUserController,
	);
};

export default userRoutes;
