import Fastify from "fastify";

import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";

import FastifyCORS from "@fastify/cors";
import FastifyJWT from "@fastify/jwt";

import verifyJWT from "./Decorators/JWT";

import authRoutes from "./Features/Auth/Routes";
import userRoutes from "./Features/User/Routes";
import noteRoutes from "./Features/Note/Routes";

const buildApp = async () => {
	const app = Fastify();

	// Swagger
	await app.register(FastifySwagger, { swagger: { info: { title: "Notes Web App", version: "1.0.0" } } });
	await app.register(FastifySwaggerUI, { routePrefix: "/docs", uiConfig: { supportedSubmitMethods: [] } });
	app.after(() => console.log("SWAGGER -------> LOADED"));

	// Plugins
	await app.register(FastifyCORS, { origin: ["http://localhost:5173", "http://127.0.0.1:5173"] });
	await app.register(FastifyJWT, { secret: String(process.env.JWT_SECRET) });
	app.after(() => console.log("PLUGINS -------> LOADED"));

	// Decorators
	app.decorate("verifyJWT", verifyJWT);
	app.after(() => console.log("DECORATORS ----> LOADED"));

	// Routes
	await app.register(authRoutes, { prefix: "/api/auth" });
	await app.register(userRoutes, { prefix: "/api/user" });
	await app.register(noteRoutes, { prefix: "/api/note" });
	app.after(() => console.log("ROUTES --------> LOADED"));

	// The server is ready to be accessed
	app.ready(() => console.log("\nSERVER --------> READY"));
	return app;
};

export default buildApp;
