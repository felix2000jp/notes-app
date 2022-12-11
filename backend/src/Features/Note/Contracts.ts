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
			CreatedAt: Type.String({ format: "date" }),
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
	description: "Get one page of notes ordered by name. Each page has 10 notes.",
	querystring: Type.Object({
		Page: Type.Number({ minimum: 1 }),
	}),
	response: {
		200: Type.Object({
			Notes: Type.Array(
				Type.Object({
					CreatedAt: Type.String({ format: "date-time" }),
					ID: Type.String({ format: "uuid" }),
					Name: Type.String(),
					Text: Type.String(),
				}),
			),
			Total: Type.Number(),
			StatusCode: Type.String({ default: "OK" }),
		}),
		500: Type.Object({
			StatusCode: Type.String({ default: "ERROR" }),
			ErrorMessage: Type.String(),
		}),
	},
};

// New Note Contract
export const NewNote = {
	tags: ["Note"],
	description: "Create a new note belonging to the signed in user.",
	body: Type.Object({
		Name: Type.String({ minLength: 1, maxLength: 50 }),
		Text: Type.String({ minLength: 1, maxLength: 500 }),
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

// Update Note Contract
export const UpdateNote = {
	tags: ["Note"],
	description: "Update an existing note belonging to the signed in user.",
	params: Type.Object({
		ID: Type.String({ format: "uuid" }),
	}),
	body: Type.Object({
		Name: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
		Text: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
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

// Delete Note Contract
export const DeleteNote = {
	tags: ["Note"],
	description: "Delete an existing note belonging to the signed in user.",
	params: Type.Object({
		ID: Type.String({ format: "uuid" }),
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
