import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
import * as Contracts from "./Contracts";
import * as Hashing from "../../Utils/Hashing";

export const signUpController = async (
	req: FastifyRequest<{ Body: typeof Contracts.SignUpSchema.body.static }>,
	res: FastifyReply,
) => {
	try {
		// Verify that there no other user with the same elamil
		const user = await prisma.user.findUnique({ where: { Email: req.body.Email } });
		if (user) throw new Error("User already exists");

		// We hash the password and save the user
		const hash = await Hashing.hashPassword(req.body.Password);
		await prisma.user.create({ data: { Email: req.body.Email, Password: hash } });

		return res.status(200).send({});
	} catch (error) {
		return res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};

export const signInController = async (
	req: FastifyRequest<{ Body: typeof Contracts.SignInSchema.body.static }>,
	res: FastifyReply,
) => {
	try {
		// We verify the User exists
		const user = await prisma.user.findUnique({ where: { Email: req.body.Email } });
		if (!user) throw new Error("User does not exist");

		// We verify that the password is correct
		const isValid = await Hashing.checkPassword(user.Password, req.body.Password);
		if (!isValid) throw new Error("Password is not correct");

		// We create the AccessToken and return the response
		const accessToken = await res.jwtSign({ ID: user.ID }, { expiresIn: "3h" });
		return await res.status(200).send({ AccessToken: accessToken });
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
