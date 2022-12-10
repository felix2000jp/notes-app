import { FastifyInstance } from "fastify";

import * as Contracts from "./Contracts";
import * as Controllers from "./Controllers";

const noteRoutes = async (app: FastifyInstance) => {
	// Get Note Route
	app.get("/:ID", { preHandler: app.verifyJWT as any, schema: Contracts.GetNote }, Controllers.GetNote);

	// Get Notes Page By Name Route
	app.get("/", { preHandler: app.verifyJWT as any, schema: Contracts.GetNotesPage }, Controllers.GetNotesPage);

	// New Note Route
	app.post("/", { preHandler: app.verifyJWT as any, schema: Contracts.NewNote }, Controllers.NewNote);

	// Update Note Route
	app.patch("/:ID", { preHandler: app.verifyJWT as any, schema: Contracts.UpdateNote }, Controllers.UpdateNote);

	// Delete Note Route
	app.delete("/:ID", { preHandler: app.verifyJWT as any, schema: Contracts.DeleteNote }, Controllers.DeleteNote);
};

export default noteRoutes;
