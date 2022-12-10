interface TopbarProps {
	Email: string;
}

const Topbar = (props: TopbarProps) => {
	return (
		<nav className="navbar is-primary has-shadow">
			<div className="navbar-brand">
				<div className="navbar-item">
					<img src="./logo-color-no-background.png" />
				</div>
			</div>
			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<p className="is-size-6 has-text-weight-bold has-text-link">{props.Email}</p>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Topbar;
