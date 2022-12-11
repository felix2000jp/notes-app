import { AxiosError } from "axios";

import ApiClient from "../ApiClient";
import * as Contracts from "./Contracts";

export const GetSignedInUser = async (): Promise<typeof Contracts.GetSignedInUser.RETURNS.static> => {
	try {
		const response = await ApiClient.get<typeof Contracts.GetSignedInUser.OK.static>("/api/user");
		return response.data;
	} catch (error) {
		const err = error as AxiosError<typeof Contracts.GetSignedInUser.ERROR.static>;
		if (err.response?.data.StatusCode === "ERROR") return err.response.data;
		return { StatusCode: "ERROR", ErrorMessage: "Something went wrong" };
	}
};
