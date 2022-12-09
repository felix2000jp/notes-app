import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const userRoutes = async (app: FastifyInstance) => {
	// Get Note Route
	app.get("/:ID", { preHandler: app.verifyJWT as any, schema: Contracts.GetNote }, Controllers.GetNote);
};

export default userRoutes;
