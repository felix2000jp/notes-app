import useHome from "./Home.logic";

import Topbar from "../../Components/Topbar";
import Note from "../../Components/Note";

const Home = () => {
	const logic = useHome();

	return (
		<>
			<Topbar Email={logic.user.Email} />
			<main className="section">
				<Note Name={logic.notes?.Notes[0]} />
			</main>
		</>
	);
};

export default Home;
