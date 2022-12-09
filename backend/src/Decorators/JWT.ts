import { FastifyRequest, FastifyReply } from "fastify";

import PermissionErrors from "../Errors/PermissionErrors";

// We verify the current accesstToken
const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch {
		await res.status(401).send({ StatusCode: "ERROR", ErrorMessage: PermissionErrors.INVALID_TOKEN });
	}
};

export default verifyJWT;
