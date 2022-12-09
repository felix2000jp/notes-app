import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const noteRoutes = async (app: FastifyInstance) => {
	// Get Note Route
	app.get("/:ID", { preHandler: app.verifyJWT as any, schema: Contracts.GetNote }, Controllers.GetNote);

	// Get Notes Page Route
	app.get("/", { preHandler: app.verifyJWT as any, schema: Contracts.GetNotesPage }, Controllers.GetNotesPage);
};

export default noteRoutes;
