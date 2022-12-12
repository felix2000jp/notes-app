import React, { useEffect, useState, useRef } from "react";
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

	// New note
	// Input
	const nameRef = useRef<HTMLInputElement>(null);
	const textRef = useRef<HTMLInputElement>(null);
	// Errors
	const [errorMessage, setErrorMessage] = useState("");
	// Modal
	const [modal, setModal] = useState(false);

	const NewNote = async () => {
		const name = nameRef.current?.value;
		const text = textRef.current?.value;
		if (!name || !text) {
			setErrorMessage("Please fill both the name and text");
			return "ERROR";
		}

		const response = await NoteService.NewNote(name, text);
		if (response.StatusCode === "ERROR") {
			setErrorMessage(response.ErrorMessage);
			return "ERROR";
		}

		const notesResponse = await NoteService.GetNotesPage(notes.Page);
		if (notesResponse.StatusCode === "ERROR") return "ERROR";

		notes.setNotes(notesResponse.Notes);
		notes.setTotal(notesResponse.Total);
		notes.setPages();
		setModal(false);
		return "OK";
	};

	const closeModal = async () => {
		setModal(false);
	};
	const openModal = async () => {
		setModal(true);
	};

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

	return { user, notes, changePage, modal, nameRef, textRef, errorMessage, NewNote, closeModal, openModal };
};

export default useHome;
