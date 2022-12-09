import { FastifyRequest, FastifyReply } from "fastify";

import prisma from "../../Utils/Prisma";
import NoteErrors from "../../Errors/NoteErrors";
import PermissionErrors from "../../Errors/PermissionErrors";
import * as Contracts from "./Contracts";

// Get Note Controller
export const GetNote = async (req: FastifyRequest<{ Params: typeof Contracts.GetNote.params.static }>, res: FastifyReply) => {
	try {
		// We verify that the note exists
		const note = await prisma.note.findUnique({ where: { ID: req.user.ID } });
		if (!note) throw new Error(NoteErrors.NOTE_NOT_FOUND);

		// We verify that the note belongs to the signed in user
		if (note.UserID !== req.user.ID) throw new Error(PermissionErrors.PERMISSION);

		return await res.status(200).send(note);
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};

// Get Notes Page Controller
export const GetNotesPage = async (
	req: FastifyRequest<{ Querystring: typeof Contracts.GetNotesPage.querystring.static }>,
	res: FastifyReply,
) => {
	try {
		const notesPerPage = 10;

		// We get the total number of notes belonging to this user and and a page of 10 notes ordered by their name
		const total = await prisma.note.count({ where: { ID: req.user.ID } });
		const notes = await prisma.note.findMany({
			where: { ID: req.user.ID },
			skip: notesPerPage * (req.query.Page - 1),
			take: notesPerPage,
			orderBy: { Name: "desc" },
		});

		return await res.status(200).send({ Notes: notes, Total: total });
	} catch (error) {
		return await res.status(500).send({ ErrorMessage: (error as Error).message });
	}
};
