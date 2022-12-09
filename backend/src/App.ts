import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import FastifyCORS from "@fastify/cors";
import FastifyJWT from "@fastify/jwt";

import SwaggerConfig from "./Configs/SwaggerConfig";
import CORSConfig from "./Configs/CORSConfig";
import JWTConfig from "./Configs/JWTConfig";
import SwaggerUIConfig from "./Configs/SwaggerUIConfig";

import verifyJWT from "./Decorators/JWT";

import authRoutes from "./Features/Auth/Routes";
import userRoutes from "./Features/User/Routes";
import noteRoutes from "./Features/Note/Routes";

const buildApp = async () => {
	const app = Fastify();

	// Plugin
	await app.register(fastifySwagger, SwaggerConfig);
	await app.register(FastifySwaggerUi, SwaggerUIConfig);
	await app.register(FastifyCORS, CORSConfig);
	await app.register(FastifyJWT, JWTConfig);
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
