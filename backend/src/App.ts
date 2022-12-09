import Fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

import FastifyCORS from "@fastify/cors";
import FastifyJWT from "@fastify/jwt";

import verifyJWT from "./Decorators/JWT";

import authRoutes from "./Features/Auth/Routes";

const buildApp = async () => {
	const app = Fastify();

	// Swagger Setup
	await app.register(fastifySwagger, { mode: "dynamic" });
	await app.register(FastifySwaggerUi, { routePrefix: "/documentation" });
	app.after(() => console.log("SWAGGER -------> LOADED"));

	// Plugin
	await app.register(FastifyCORS, { origin: ["http://localhost:5173", "http://127.0.0.1:5173"] });
	await app.register(FastifyJWT, { secret: String(process.env.JWT_SECRET) });
	app.after(() => console.log("PLUGINS -------> LOADED"));

	// Decorators
	app.decorate("verifyJWT", verifyJWT);
	app.after(() => console.log("DECORATORS ----> LOADED"));

	// Routes
	await app.register(authRoutes, { prefix: "/api/auth" });
	app.after(() => console.log("ROUTES --------> LOADED"));

	// The server is ready to be accessed
	app.ready(() => console.log("\nSERVER --------> READY"));
	return app;
};

export default buildApp;
