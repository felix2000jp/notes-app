import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as UserService from "../../Services/UserService";

const useHome = () => {
	// Navigation
	const navigate = useNavigate();

	// User
	const [user, setUser] = useState({ ID: "", Email: "" });

	// Get User and Notes
	useEffect(() => {
		const getUser = async () => {
			const response = await UserService.GetSignedInUser();
			setUser({ ID: response.ID, Email: response.Email });
		};
		getUser().catch(() => navigate("/signin"));
	}, []);

	return { user };
};

export default useHome;
