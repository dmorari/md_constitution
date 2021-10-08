import guguta from './img/guguta.png'
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./context/language";

function Home(props) {
	const { language } = useLanguage()
	const title = (language === "ro") ? "Fiecare poate fi Moldovean" : "Каждый может быть молдованом"
	const content = (language === "ro") ? 
	"Republica Moldova e o țară de drept. Să fii moldovan - să-ți stii constituția." 
	: "Республика Молдова - государство закона. Быть молдованом - знать свою констититуцию."
	
	const pressButton = (language === "ro") ? 
	"Apasă butonul din jos să te antrenezi" 
	: "Нажми кнопну ниже, чтобы начать тренировку"

	const begin = (language === "ro") ? 
	"Vreau sa devin Moldoveancă!" 
	: "Хочу стать Молдованкой!"

	return (
	  <>
		<div className="px-4 py-2 my-5 text-center">
		  <img className="d-block mx-auto mb-4 mt-2" src={guguta} alt="" height="220" />
		  <h1 className="display-5 fw-bold">{title}</h1>
		  <div className="col-lg-6 mx-auto">
			<p className="lead mb-4">{content}</p>
			<p className=" mb-4 fw-light">{pressButton} </p>
			<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
			  <Link to="/quiz">
				<button type="button" className="btn btn-success btn-lg px-4 me-sm-3"><i className="bi-trophy-fill me-3"></i>{begin}</button>
			  </Link>
			</div>
		  </div>
		</div>
  
	  </>
	)
  }
  
  export default Home;