import { FastifyRequest, FastifyReply } from "fastify";

import Errors from "../Utils/Errors";

// We verify the current accesstToken
const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch {
		await res.status(401).send({ StatusCode: "ERROR", ErrorMessage: Errors.TOKEN });
	}
};

export default verifyJWT;
