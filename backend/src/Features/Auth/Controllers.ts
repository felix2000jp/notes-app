import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
import UserErrors from "../../Errors/UserErrors";
import * as Contracts from "./Contracts";
import * as Hashing from "../../Utils/Hashing";

// Sign Up Controller
export const SignUp = async (req: FastifyRequest<{ Body: typeof Contracts.SignUp.body.static }>, res: FastifyReply) => {
	try {
		// Verify that there no other user with the same elamil
		const user = await prisma.user.findUnique({ where: { Email: req.body.Email } });
		if (user) throw new Error(UserErrors.USER_NOT_UNIQUE);

		// We hash the password and save the user
		const hash = await Hashing.hashPassword(req.body.Password);
		await prisma.user.create({ data: { Email: req.body.Email, Password: hash } });

		return res.status(200).send({});
	} catch (error) {
		return res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};

// Sign In Controller
export const SignIn = async (req: FastifyRequest<{ Body: typeof Contracts.SignIn.body.static }>, res: FastifyReply) => {
	try {
		// We verify the User exists
		const user = await prisma.user.findUnique({ where: { Email: req.body.Email } });
		if (!user) throw new Error(UserErrors.USER_NOT_FOUND);

		// We verify that the password is correct
		const isValid = await Hashing.checkPassword(user.Password, req.body.Password);
		if (!isValid) throw new Error(UserErrors.USER_PASSWORD);

		// We create the AccessToken and return the response
		const accessToken = await res.jwtSign({ ID: user.ID }, { expiresIn: "30d" });
		return await res.status(200).send({ AccessToken: accessToken });
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
