import { Type } from "@sinclair/typebox";

export const SignIn = {
	OK: Type.Object({
		StatusCode: Type.Literal("OK"),
		AccessToken: Type.String(),
	}),
	ERROR: Type.Object({
		StatusCode: Type.Literal("ERROR"),
		ErrorMessage: Type.String(),
	}),

	get RETURNS() {
		return Type.Union([this.OK, this.ERROR]);
	},
};

export const SignUp = {
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
