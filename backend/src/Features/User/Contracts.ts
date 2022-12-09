import { Type } from "@sinclair/typebox";

// Get Signed In User Information Schema
export const GetSignedInUserSchema = {
	tags: ["User"],
	description: "Get the signed in user information.",
	response: {
		200: Type.Object({
			ID: Type.String({ format: "uuid" }),
			Email: Type.String({ format: "email" }),
			StatusCode: Type.String({ default: "OK" }),
		}),
		500: Type.Object({
			StatusCode: Type.String({ default: "ERROR" }),
			ErrorMessage: Type.String(),
		}),
	},
};

// Delete Signed In User Schema
export const DeleteSignedInUserSchema = {
	tags: ["User"],
	description: "Delete the signed in user.",
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
