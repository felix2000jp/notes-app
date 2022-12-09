import { Type } from "@sinclair/typebox";

// Get Note Contract
export const GetNote = {
	tags: ["Note"],
	description: "Get one note information given its ID.",
	params: Type.Object({
		ID: Type.String({ format: "uuid" }),
	}),
	response: {
		200: Type.Object({
			ID: Type.String({ format: "uuid" }),
			Name: Type.String(),
			Text: Type.String(),
			StatusCode: Type.String({ default: "OK" }),
		}),
		500: Type.Object({
			StatusCode: Type.String({ default: "ERROR" }),
			ErrorMessage: Type.String(),
		}),
	},
};
