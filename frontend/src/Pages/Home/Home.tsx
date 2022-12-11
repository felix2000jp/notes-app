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
				</div>
			</main>
			<footer className="section">
				<nav className="pagination">
					<ul className="pagination-list">
						{Array.from(Array(logic.pages).keys()).map((page) => (
							<li key={page}>
								<button className="pagination-link" value={page + 1} onClick={logic.changePage}>
									{page + 1}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</footer>
		</>
	);
};

export default Home;
