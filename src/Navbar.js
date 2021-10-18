
import React from "react";
import logo from './img/flag_moldova.jpg'
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import icons from 'bootstrap-icons/bootstrap-icons.svg';
import { useLanguage } from "./context/language";

function Navbar(props) {
	const origin = (window.location.origin.includes("github")) ? "/md_constitution" : "";

	const { language, setLanguage } = useLanguage()
	const ruButtonStyle = (language == "ru") ? "btn btn-info me-2" : "btn btn-outline-dark me-2"
	const roButtonStyle = (language == "ro") ? "btn btn-info" : "btn btn-outline-dark"
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light" >
			<div className="container">
				<div className="navbar-header">
					<Link className="navbar-brand" to={origin + "/"}>
						<img src={logo} alt="" height="40" className="d-inline-block align-top" />
					</Link>
				</div>
				<div className="d-flex">
					<button className={ruButtonStyle} type="button" onClick={() => setLanguage("ru")}>Русский</button>
					<button className={roButtonStyle} type="button" onClick={() => setLanguage("ro")}>Romana</button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;