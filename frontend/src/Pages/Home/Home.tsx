import useHome from "./Home.logic";

import Topbar from "../../Components/Topbar";
import Note from "../../Components/Note/Note";

const Home = () => {
	const logic = useHome();

	return (
		<>
			<Topbar Email={logic.user} />
			<main className="section">
				<div className="columns is-mobile is-multiline">
					{logic.notes?.Notes.map((note) => (
						<div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen" key={note.ID}>
							<Note ID={note.ID} Name={note.Name} Text={note.Text} CreatedAt={note.CreatedAt} />
						</div>
					))}
					<div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-flex is-justify-content-center is-align-items-center">
						<button className="button is-success is-large" onClick={logic.openModal}>
							New Note
						</button>
					</div>
				</div>
			</main>
			<footer className="section">
				<nav className="pagination">
					<ul className="pagination-list">
						{Array.from(Array(logic.notes.Pages).keys()).map((page) => (
							<li key={page}>
								<button className="pagination-link" value={page + 1} onClick={logic.changePage}>
									{page + 1}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</footer>
			<div className={logic.modal ? "modal is-active" : "modal"} id="newNote">
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<div className="field">
							<label className="label">Name</label>
							<div className="control">
								<input className="input" type="text" ref={logic.nameRef} />
							</div>
						</div>
					</header>
					<section className="modal-card-body">
						<div className="field">
							<label className="label">Text</label>
							<div className="control">
								<input className="input" type="text" ref={logic.textRef} />
							</div>
						</div>
					</section>
					<footer className="modal-card-foot">
						<button className="button is-success" onClick={logic.NewNote}>
							Create note
						</button>
						<button className="button is-dark" onClick={logic.closeModal}>
							Cancel
						</button>
						<div className="has-text-centered">
							<p className="has-text-danger">{logic.errorMessage}</p>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
};

export default Home;
