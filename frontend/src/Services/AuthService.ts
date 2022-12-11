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
		console.log(err);
		if (err.response?.data.StatusCode === "ERROR") return { Status: err.response?.data.ErrorMessage };
		return { Status: "Something went wrong" };
	}
};

export const SignUp = async (Email: string, Password: string) => {
	try {
		await ApiClient.post("/api/auth/signup", { Email, Password });
		return { Status: "OK" };
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.data.StatusCode === "ERROR") return { Status: "ERROR", ErrorMessage: error.response?.data.ErrorMessage };
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		} else {
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		}
	}
};
