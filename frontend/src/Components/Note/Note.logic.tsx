import * as NoteService from "../../Services/Note/Service";

import useNotesStore from "../../Stores/NotesStore";

const useNote = (ID: string) => {
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

	return { deleteNote };
};

export default useNote;
