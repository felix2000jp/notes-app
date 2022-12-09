import bcryt from "bcrypt";

// Receives a test password and hashes it
export const hashPassword = async (password: string) => {
	const salt = await bcryt.genSalt();
	const hash = await bcryt.hash(password, salt);
	return hash;
};

// Compares a hash and a test passowrd and sees if they have the same content
export const checkPassword = async (hash: string, password: string) => {
	const isValid = await bcryt.compare(password, hash);
	return isValid;
};
