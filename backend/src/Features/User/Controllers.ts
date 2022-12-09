import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
import UserErrors from "../../Errors/UserErrors";

// Get Signed In User Controller
export const GetSignedInUser = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		// We verify the User exists
		const user = await prisma.user.findUnique({ where: { ID: req.user.ID } });
		if (!user) throw new Error(UserErrors.USER_NOT_FOUND);

		return await res.status(200).send(user);
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};

// Delete Signed In User Controller
export const DeleteSignInUser = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		// We verify the User exists
		const user = await prisma.user.findUnique({ where: { ID: req.user.ID } });
		if (!user) throw new Error(UserErrors.USER_NOT_FOUND);

		// We delete the user
		await prisma.user.delete({ where: { ID: user.ID } });
		return await res.status(200).send({});
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
