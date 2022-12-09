import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const userRoutes = async (app: FastifyInstance) => {
	// Get Signed In User Route
	app.get("/", { preHandler: app.verifyJWT as any, schema: Contracts.GetSignedInUser }, Controllers.GetSignedInUser);

	// Delete Signed In User Route
	app.delete("/", { preHandler: app.verifyJWT as any, schema: Contracts.DeleteSignedInUser }, Controllers.DeleteSignInUser);
};

export default userRoutes;
