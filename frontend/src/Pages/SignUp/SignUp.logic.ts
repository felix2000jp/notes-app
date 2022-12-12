import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as AuthService from "../../Services/Auth/Service";

const useSignUp = () => {
	// Navigation
	const navigate = useNavigate();

	// Inputs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmRef = useRef<HTMLInputElement>(null);

	// Errors
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Button States
	const [loading, setLoading] = useState(false);

	// Button Handlers
	const SignUpButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// We prevent it from reloading the page
		e.preventDefault();

		// We verify if the both inputs have values
		if (!emailRef.current?.value || !passwordRef.current?.value || !confirmRef.current?.value) {
			setError(true);
			setErrorMessage("Email and/or Password and/or Confirm Password is empty");
			return "ERROR";
		}

		// We verify that Password and Confirma password are equal
		if (passwordRef.current.value !== confirmRef.current.value) {
			setError(true);
			setErrorMessage("Password and Confirm Password do not match");
			return "ERROR";
		}

		// We signin and verify if we have an ERROR or an OK
		setLoading(true);
		const response = await AuthService.SignUp(emailRef.current.value, passwordRef.current.value);
		if (response.StatusCode === "OK") {
			navigate("/");
			return "OK";
		}

		setLoading(false);
		setError(true);
		setErrorMessage(response.ErrorMessage);
		return "ERROR";
	};

	return { emailRef, passwordRef, confirmRef, error, errorMessage, loading, SignUpButton };
};

export default useSignUp;
