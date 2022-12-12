import { AxiosError } from "axios";

import ApiClient from "../ApiClient";
import * as Contracts from "./Contracts";

export const GetNotesPage = async (Page: number): Promise<typeof Contracts.GetNotesPage.RETURNS.static> => {
	try {
		const response = await ApiClient.get<typeof Contracts.GetNotesPage.OK.static>("/api/note", { params: { Page: Page } });
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.GetNotesPage.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};

export const DeleteNote = async (ID: string): Promise<typeof Contracts.DeleteNote.RETURNS.static> => {
	try {
		const response = await ApiClient.delete<typeof Contracts.DeleteNote.OK.static>(`/api/note/${ID}`);
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.DeleteNote.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};

export const UpdateNote = async (ID: string, Name?: string, Text?: string): Promise<typeof Contracts.UpdateNote.RETURNS.static> => {
	try {
		const response = await ApiClient.patch<typeof Contracts.UpdateNote.OK.static>(`/api/note/${ID}`, { Name: Name, Text: Text });
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.UpdateNote.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};

export const NewNote = async (Name: string, Text: string): Promise<typeof Contracts.NewNote.RETURNS.static> => {
	try {
		const response = await ApiClient.post<typeof Contracts.NewNote.OK.static>(`/api/note`, { Name: Name, Text: Text });
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.NewNote.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};
