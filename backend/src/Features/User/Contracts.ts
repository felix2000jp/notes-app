import { Type } from "@sinclair/typebox";

// Get Signed In User Contract
export const GetSignedInUser = {
	tags: ["User"],
	description: "Get the signed in user information.",
	security: [{ bearer: [] }],
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

// Delete Signed In User Contract
export const DeleteSignedInUser = {
	tags: ["User"],
	description: "Delete the signed in user.",
	security: [{ bearer: [] }],
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
