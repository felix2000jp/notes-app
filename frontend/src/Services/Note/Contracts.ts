import { Type } from "@sinclair/typebox";

export const GetNotesPage = {
	OK: Type.Object({
		StatusCode: Type.Literal("OK"),
		Notes: Type.Array(
			Type.Object({
				ID: Type.String(),
				Name: Type.String(),
				Text: Type.String(),
				CreatedAt: Type.String(),
			}),
		),
		Total: Type.Number(),
	}),
	ERROR: Type.Object({
		StatusCode: Type.Literal("ERROR"),
		ErrorMessage: Type.String(),
	}),

	get RETURNS() {
		return Type.Union([this.OK, this.ERROR]);
	},
};

export const DeleteNote = {
	OK: Type.Object({
		StatusCode: Type.Literal("OK"),
	}),
	ERROR: Type.Object({
		StatusCode: Type.Literal("ERROR"),
		ErrorMessage: Type.String(),
	}),

	get RETURNS() {
		return Type.Union([this.OK, this.ERROR]);
	},
};
