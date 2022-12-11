import * as NoteService from "../../Services/Note/Service";

const useNote = (ID: string) => {
	const deleteNote = async () => {
		await NoteService.DeleteNote(ID);
	};

	return { deleteNote };
};

export default useNote;
