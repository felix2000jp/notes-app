import { AxiosError } from "axios";
import ApiClient from "./ApiClient";

export const GetSignedInUser = async () => {
	try {
		const user = await ApiClient.get("/api/user");
		return { Status: "OK", ID: user.data.ID, Email: user.data.Email };
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.data.StatusCode === "ERROR") return { Status: "ERROR", ErrorMessage: error.response?.data.ErrorMessage };
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		} else {
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		}
	}
};
