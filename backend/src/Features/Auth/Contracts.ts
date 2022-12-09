import { Type } from "@sinclair/typebox";

// Sign Up Schema
export const SignUp = {
	tags: ["Auth"],
	description: "Sign Up a new user.",
	body: Type.Object({
		Name: Type.String(),
		Email: Type.String({ format: "email" }),
		Password: Type.String(),
	}),
	response: {
		200: Type.Object({
			StatusCode: Type.String({ default: "OK" }),
		}),
		500: Type.Object({
			StatusCode: Type.String({ default: "ERROR" }),
			ErrorMessage: Type.String(),
		}),
	},
};

// Sign In Schema
export const SignIn = {
	tags: ["Auth"],
	description: "Sign Up an existing user.",
	body: Type.Object({
		Email: Type.String({ format: "email" }),
		Password: Type.String(),
	}),
	response: {
		200: Type.Object({
			AccessToken: Type.String(),
			StatusCode: Type.String({ default: "OK" }),
		}),
		500: Type.Object({
			StatusCode: Type.String({ default: "ERROR" }),
			ErrorMessage: Type.String(),
		}),
	},
};
