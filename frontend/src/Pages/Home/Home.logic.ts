import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useNotesStore from "../../Stores/NotesStore";

import * as UserService from "../../Services/User/Service";
import * as NoteService from "../../Services/Note/Service";

const useHome = () => {
	// Navigation
	const navigate = useNavigate();

	// User
	const [user, setUser] = useState<string>("");

	// Notes
	const notes = useNotesStore();

	// Get User and Notes
	useEffect(() => {
		const getUser = async () => {
			const response = await UserService.GetSignedInUser();
			if (response.StatusCode === "ERROR") {
				navigate("/signin");
				return "ERROR";
			}

			setUser(response.Email);
			return "OK";
		};

		getUser().catch(console.error);
	}, []);

	useEffect(() => {
		console.log("yo");
		const getNotes = async () => {
			const response = await NoteService.GetNotesPage(notes.Page);
			if (response.StatusCode === "ERROR") {
				navigate("/signin");
				return "ERROR";
			}

			notes.setNotes(response.Notes);
			notes.setTotal(response.Total);
			notes.setPages();
			return "OK";
		};
		getNotes().catch(console.error);
	}, [notes.Page]);

	// Buttons
	const changePage = (event: React.MouseEvent<HTMLButtonElement>) => {
		notes.setPage(Number(event.currentTarget.value));
	};

	return { user, notes, changePage };
};

export default useHome;
