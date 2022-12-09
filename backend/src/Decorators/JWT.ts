import { FastifyRequest, FastifyReply } from "fastify";

// We verify the current accesstToken
const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch {
		await res.status(401).send({ StatusCode: "Error", ErrorMessage: "Authorization token is invalid" });
	}
};

export default verifyJWT;
