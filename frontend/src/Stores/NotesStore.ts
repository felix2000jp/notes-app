import create from "zustand";

type NotesState = {
	Notes: { ID: string; Name: string; Text: string; CreatedAt: string }[];
	Total: number;
	Pages: number;
	Page: number;
	setNotes: (Notes: { ID: string; Name: string; Text: string; CreatedAt: string }[]) => void;
	setTotal: (Total: number) => void;
	setPages: () => void;
	setPage: (Page: number) => void;
	create: (Note: { ID: string; Name: string; Text: string; CreatedAt: string }) => void;
	delete: (ID: string) => void;
};

const useNotesStore = create<NotesState>((set) => ({
	Notes: [],
	Total: 0,
	Pages: 1,
	Page: 1,
	setNotes: (Notes) => set((state) => ({ ...state, Notes: Notes })),
	setTotal: (Total) => set((state) => ({ ...state, Total: Total })),
	setPages: () => set((state) => ({ ...state, Pages: Math.ceil(state.Total / 12) })),
	setPage: (Page) => set((state) => ({ ...state, Page: Page })),
	create: (Note) => set((state) => ({ ...state, Notes: [...state.Notes, Note] })),
	delete: (ID) => set((state) => ({ ...state, Notes: state.Notes.filter((note) => note.ID !== ID) })),
}));

export default useNotesStore;
