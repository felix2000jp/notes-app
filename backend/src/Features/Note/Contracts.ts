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

// Get Notes Page Contract
export const GetNotesPage = {
	tags: ["Note"],
	description: "Get one page of notes. Each page has 10 notes.",
	querystring: Type.Object({
		Page: Type.Number({ minimum: 1 }),
	}),
	response: {
		200: Type.Object(
			{
				Notes: Type.Array(
					Type.Object({
						ID: Type.String({ format: "uuid" }),
						Name: Type.String(),
						Text: Type.String(),
					}),
				),
				Total: Type.Number(),
				StatusCode: Type.String({ default: "OK" }),
			},
			{ description: "OK" },
		),
		500: Type.Object(
			{
				StatusCode: Type.String({ default: "ERROR" }),
				ErrorMessage: Type.String(),
			},
			{ description: "ERROR" },
		),
	},
};
