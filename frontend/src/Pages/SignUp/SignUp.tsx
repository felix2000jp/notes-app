import { Link } from "react-router-dom";
import useSignUp from "./SignUp.logic";

const SignUp = () => {
	const logic = useSignUp();

	return (
		<>
			<header className="hero is-primary">
				<div className="hero-body">
					<p className="title has-text-link">Notes App</p>
					<p className="subtitle has-text-link">The perfect place to take some notes</p>
				</div>
			</header>
			<main className="section">
				<div className="columns is-centered is-mobile">
					<div className="column is-full-mobile is-four-fifths-tablet is-three-fifths-desktop is-two-fifths-widescreen box">
						<figure className="image container is-128x128">
							<img src="./logo-color.png" />
						</figure>
						<form>
							<div className="field">
								<label className="label">Email</label>
								<div className="control">
									<input className="input is-primary" type="email" placeholder="e.g. alex@example.com" ref={logic.emailRef} />
								</div>
							</div>
							<div className="field">
								<label className="label">Password</label>
								<div className="control">
									<input className="input is-primary" type="password" placeholder="********" ref={logic.passwordRef} />
								</div>
							</div>
							<div className="field">
								<label className="label">Confirm Password</label>
								<div className="control">
									<input className="input is-primary" type="password" placeholder="********" ref={logic.confirmRef} />
								</div>
							</div>
							<div className="buttons">
								<button
									className={`button is-primary has-text-link ${logic.loading && "is-loading"}`}
									disabled={logic.loading}
									onClick={logic.SignUpButton}
								>
									Sign Up
								</button>
								<Link to="/signin" className="button is-primary has-text-link">
									Sign In
								</Link>
							</div>
							<div className="has-text-centered">
								<p className="has-text-danger">{logic.errorMessage}</p>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
};

export default SignUp;
