import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
import ErrorMessages from "../../Utils/Errors";
import * as Contracts from "./Contracts";

// Get Note Controller
export const GetNote = async (req: FastifyRequest<{ Params: typeof Contracts.GetNote.params.static }>, res: FastifyReply) => {
	try {
		// We verify that the note exists
		const note = await prisma.note.findUnique({ where: { ID: req.user.ID } });
		if (!note) throw new Error(ErrorMessages.NOTE_NOT_FOUND);

		// We verify that the note belongs to the signed in user
		if (note.UserID !== req.user.ID) throw new Error(ErrorMessages.PERMISSION);

		return await res.status(200).send(note);
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
