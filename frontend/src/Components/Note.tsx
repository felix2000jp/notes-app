interface NoteProps {
	Name: string;
	Text: string;
	CreatedAt: Date;
}

const Note = (props: NoteProps) => {
	return (
		<div className="card has-background-link">
			<header className="card-header">
				<p className="card-header-title">{props.Name}</p>
			</header>
			<div className="card-content">
				<div className="content">
					{props.Text}
					<br />
					<br />
					<time className="has-text-primary">{props.CreatedAt.getDate()}</time>
				</div>
			</div>
			<footer className="card-footer">
				<button className="button is-warning is-fullwidth is-flex is-justify-content-center">Update</button>
				<button className="button is-danger is-fullwidth is-flex is-justify-content-center">Delete</button>
			</footer>
		</div>
	);
};

export default Note;
