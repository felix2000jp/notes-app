import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as AuthService from "../../Services/AuthService";

const useSignIn = () => {
	// Navigation
	const navigate = useNavigate();

	// Inputs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// Errors
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Button States
	const [loading, setLoading] = useState(false);

	// Button Handlers
	const SignInButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// We prevent it from reloading the page
		e.preventDefault();

		// We verify if the both inputs have values
		if (!emailRef.current?.value || !passwordRef.current?.value) {
			setError(true);
			setErrorMessage("Email and/or Password is empty");
			return "ERROR";
		}
		// We signin and verify if we have an ERROR or an OK
		setLoading(true);
		const response = await AuthService.SignIn(emailRef.current.value, passwordRef.current.value);
		if (response.Status === "ERROR") {
			setLoading(false);
			setError(true);
			setErrorMessage(response.ErrorMessage);
			return "ERROR";
		}

		navigate("/");
		return "OK";
	};

	return { emailRef, passwordRef, error, errorMessage, loading, SignInButton };
};

export default useSignIn;
