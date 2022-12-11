import { AxiosError } from "axios";
import ApiClient from "./ApiClient";

interface SignInResponseOK {
	StatusCode: string;
	AccessToken: string;
}

interface SignInResponseERROR {
	StatusCode: string;
	ErrorMessage: string;
}

export const SignIn = async (Email: string, Password: string) => {
	try {
		const response = await ApiClient.post<SignInResponseOK>("/api/auth/signin", { Email, Password });
		ApiClient.defaults.headers.Authorization = `Bearer ${response.data.AccessToken}`;
		return { Status: "OK" };
	} catch (error) {
		const err = error as AxiosError<SignInResponseERROR>;
		if (err.response?.data.StatusCode === "ERROR") return { Status: err.response?.data.ErrorMessage };
		return { Status: "Something went wrong" };
	}
};

interface SignUpResponseOK {
	StatusCode: string;
}

interface SignUpResponseERROR {
	StatusCode: string;
	ErrorMessage: string;
}

export const SignUp = async (Email: string, Password: string) => {
	try {
		await ApiClient.post<SignUpResponseOK>("/api/auth/signup", { Email, Password });
		return { Status: "OK" };
	} catch (error) {
		const err = error as AxiosError<SignUpResponseERROR>;
		if (err.response?.data.StatusCode === "ERROR") return { Status: err.response?.data.ErrorMessage };
		return { Status: "Something went wrong" };
	}
};
