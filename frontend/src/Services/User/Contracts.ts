import { Type } from "@sinclair/typebox";

export const GetSignedInUser = {
	OK: Type.Object({
		StatusCode: Type.Literal("OK"),
		ID: Type.String(),
		Email: Type.String(),
		CreatedAt: Type.String(),
	}),
	ERROR: Type.Object({
		StatusCode: Type.Literal("ERROR"),
		ErrorMessage: Type.String(),
	}),

	get RETURNS() {
		return Type.Union([this.OK, this.ERROR]);
	},
};
