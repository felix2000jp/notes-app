import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as UserService from "../../Services/User/Service";
import * as NoteService from "../../Services/Note/Service";

type NotesState = {
	Notes: { ID: string; Name: string; Text: string; CreatedAt: string }[];
	Total: number;
};

const useHome = () => {
	// Navigation
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);

	// User
	const [user, setUser] = useState<string>("");
	const [notes, setNotes] = useState<NotesState>();

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
		const getNotes = async () => {
			const response = await NoteService.GetNotesPage(page);
			if (response.StatusCode === "ERROR") {
				navigate("/signin");
				return "ERROR";
			}

			setNotes({ Notes: response.Notes, Total: response.Total });
			setPages(Math.ceil(response.Total / 12));
			return "OK";
		};
		getNotes().catch(console.error);
	}, [page, notes]);

	// Buttons
	const changePage = (event: React.MouseEvent<HTMLButtonElement>) => {
		setPage(Number(event.currentTarget.value));
	};

	return { user, notes, page, pages, changePage };
};

export default useHome;
