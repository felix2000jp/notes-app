import { useRef, useState } from "react";
import * as NoteService from "../../Services/Note/Service";

import useNotesStore from "../../Stores/NotesStore";

const useNote = (ID: string, Name: string, Text: string) => {
	// Input
	const nameRef = useRef<HTMLInputElement>(null);
	const textRef = useRef<HTMLInputElement>(null);

	// Errors
	const [errorMessage, setErrorMessage] = useState("");

	// Modal
	const [modal, setModal] = useState(false);

	// Notes
	const notes = useNotesStore();

	const deleteNote = async () => {
		await NoteService.DeleteNote(ID);
		const response = await NoteService.GetNotesPage(notes.Page);
		if (response.StatusCode === "ERROR") return "ERROR";

		notes.setNotes(response.Notes);
		notes.setTotal(response.Total);
		notes.setPages();
		return "OK";
	};

	const UpdateNote = async () => {
		const name = nameRef.current?.value === "" ? Name : nameRef.current?.value;
		const text = textRef.current?.value === "" ? Text : textRef.current?.value;
		const response = await NoteService.UpdateNote(ID, name, text);
		if (response.StatusCode === "ERROR") {
			setErrorMessage(response.ErrorMessage);
			return "ERROR";
		}

		const notesResponse = await NoteService.GetNotesPage(notes.Page);
		if (notesResponse.StatusCode === "ERROR") return "ERROR";

		notes.setNotes(notesResponse.Notes);
		setModal(false);
		return "OK";
	};

	const closeModal = async () => {
		setModal(false);
	};
	const openModal = async () => {
		setModal(true);
	};

	return { modal, nameRef, textRef, errorMessage, deleteNote, UpdateNote, closeModal, openModal };
};

export default useNote;
