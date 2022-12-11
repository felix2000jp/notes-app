import { AxiosError } from "axios";

import ApiClient from "../ApiClient";
import * as Contracts from "./Contracts";

export const SignIn = async (Email: string, Password: string): Promise<typeof Contracts.SignIn.RETURNS.static> => {
	try {
		const response = await ApiClient.post<typeof Contracts.SignIn.OK.static>("/api/auth/signin", { Email, Password });
		ApiClient.defaults.headers.Authorization = `Bearer ${response.data.AccessToken}`;
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.SignIn.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};

export const SignUp = async (Email: string, Password: string): Promise<typeof Contracts.SignUp.RETURNS.static> => {
	try {
		const response = await ApiClient.post<typeof Contracts.SignUp.OK.static>("/api/auth/signup", { Email, Password });
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.SignUp.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};
