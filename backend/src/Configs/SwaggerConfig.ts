const SwaggerConfig = {
	swagger: {
		info: {
			title: "Notes App",
			description: "Notes Web App Swagger Documentation",
			version: "1.0.0",
		},
		host: "localhost:6352",
		tags: [
			{ name: "Auth", description: "Authentication related end-points" },
			{ name: "User", description: "User related end-points" },
			{ name: "Note", description: "Note related end-points" },
		],
		responses: {
			200: {
				description: "OK",
				content: "text/plain",
			},
			500: { description: "ERROR" },
		},
	},
};

export default SwaggerConfig;
