import { AxiosError } from "axios";
import ApiClient from "./ApiClient";

export const SignIn = async (Email: string, Password: string) => {
	try {
		const response = await ApiClient.post("/api/auth/signin", { Email, Password });
		ApiClient.defaults.headers.Authorization = `Bearer ${response.data.AccessToken}`;
		return { Status: "OK", ErrorMessage: "" };
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.data.StatusCode === "ERROR") return { Status: "ERROR", ErrorMessage: error.response?.data.ErrorMessage };
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		} else {
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		}
	}
};

export const SignUp = async (Email: string, Password: string) => {
	try {
		await ApiClient.post("/api/auth/signup", { Email, Password });
		return { Status: "OK", ErrorMessage: "" };
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.data.StatusCode === "ERROR") return { Status: "ERROR", ErrorMessage: error.response?.data.ErrorMessage };
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		} else {
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		}
	}
};
