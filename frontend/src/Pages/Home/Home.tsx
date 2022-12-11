import useHome from "./Home.logic";

import Topbar from "../../Components/Topbar";

const Home = () => {
	const logic = useHome();

	return <Topbar Email={logic.user.Email} />;
};

export default Home;
