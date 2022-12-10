import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
