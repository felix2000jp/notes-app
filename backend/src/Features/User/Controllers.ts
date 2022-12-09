import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
// import * as Contracts from "./Contracts";

// Delete Signed In User
export const deleteSignInUserController = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		// We verify the User exists
		const user = await prisma.user.findUnique({ where: { ID: req.user.ID } });
		if (!user) throw new Error("User does not exist");

		// We delete the user
		await prisma.user.delete({ where: { ID: user.ID } });
		return await res.status(200).send({});
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
