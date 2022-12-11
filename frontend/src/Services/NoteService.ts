import { AxiosError } from "axios";
import ApiClient from "./ApiClient";

export const GetNotesPage = async () => {
	try {
		const notes = await ApiClient.get("/api/note");
		return { Status: "OK", Notes: notes.data.Notes, Total: notes.data.Total };
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.data.StatusCode === "ERROR") return { Status: "ERROR", ErrorMessage: error.response?.data.ErrorMessage };
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		} else {
			return { Status: "ERROR", ErrorMessage: "Something went wrong" };
		}
	}
};
