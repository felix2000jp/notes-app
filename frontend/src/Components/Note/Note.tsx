import useNote from "./Note.logic";

type NoteProps = {
	ID: string;
	Name: string;
	Text: string;
	CreatedAt: string;
};

const Note = (props: NoteProps) => {
	const logic = useNote(props.ID, props.Name, props.Text);
	return (
		<>
			<div className="card has-background-link">
				<header className="card-header">
					<p className="card-header-title">{props.Name}</p>
				</header>
				<div className="card-content">
					<div className="content">
						{props.Text}
						<br />
						<br />
						<time className="has-text-primary">{props.CreatedAt}</time>
					</div>
				</div>
				<footer className="card-footer">
					<button className="button is-warning is-fullwidth is-flex is-justify-content-center" onClick={logic.openModal}>
						Update
					</button>
					<button className="button is-danger is-fullwidth is-flex is-justify-content-center" onClick={logic.deleteNote}>
						Delete
					</button>
				</footer>
			</div>
			<div className={logic.modal ? "modal is-active" : "modal"} id={props.ID}>
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<input className="input" type="text" placeholder={props.Name} ref={logic.nameRef} />
					</header>
					<section className="modal-card-body">
						<input className="input" type="textbox" placeholder={props.Text} ref={logic.textRef} />
					</section>
					<footer className="modal-card-foot">
						<button className="button is-success" onClick={logic.UpdateNote}>
							Save changes
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

export default Note;
