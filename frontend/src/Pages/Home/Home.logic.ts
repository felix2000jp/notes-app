import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as UserService from "../../Services/UserService";
import * as NoteService from "../../Services/NoteService";

interface UserState {
	ID: string;
	Email: string;
}

interface NotesState {
	Notes: [{ ID: string; Name: string; CreatedAt: Date }];
	Total: number;
}

const useHome = () => {
	// Navigation
	const navigate = useNavigate();

	// User
	const [user, setUser] = useState<UserState>();
	const [notes, setNotes] = useState<NotesState>();

	// Get User and Notes
	useEffect(() => {
		const getUser = async () => {
			const response = await UserService.GetSignedInUser();
			if (response.Status === "ERROR") navigate("/signin");

			setUser({ ID: response.ID, Email: response.Email });
		};
		const getNotes = async () => {
			const response = await NoteService.GetNotesPage();
			if (response.Status === "ERROR") navigate("/signin");

			setNotes({ Notes: response.Notes, Total: response.Total });
		};
		getUser().catch(console.error);
		getNotes().catch(console.error);
	}, []);

	return { user, notes };
};

export default useHome;
