import { useLanguage } from "./context/language";
import { quizData } from "./quizData";
import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'

function Quiz(props) {
	const [questionSeen, setQuestionsSeen] = useState([])
	const randomIndex = () => {
		var idx = -1;
		while ( questionSeen.includes(idx = Math.floor(Math.random()*quizData.length)) ) {}
		return idx;
	}

	const { language } = useLanguage()
	const [currentIdx, setCurrentIdx] = useState(randomIndex());
	const [selected, setSelected] = useState(-1);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);


	const nextQuestion = () => {
		setCorrectAnswerCount( correctAnswerCount + (quizData[currentIdx].answers[selected].correct ? 1 : 0) );

		questionSeen.push(currentIdx)
		setQuestionsSeen(questionSeen);
		setCurrentIdx(randomIndex());
		setSelected(-1);
	}


	const TARGET_COUNT = 20;

	const header = language == "ro" ? "Selectează varianta corectă" : "Выберите правильный вариант ответа"
	return (
		<div className="container mt-3">
			<div className="card">
				<div className="card-header">
					<div class="row">
						<div class="col-md-6">
							{header}
						</div>
						<div class="col-md-6">
							<div className="d-grid gap-2 d-md-flex justify-content-md-end fw-light text-muted">
								{(language === "ro") ?
									"Întrebarea " + (questionSeen.length + 1) + " din " + TARGET_COUNT
									:
									"Вопрос " + (questionSeen.length + 1) + " из " + TARGET_COUNT
								}
							</div>

						</div>
					</div>

				</div>
				<div className="card-body">
					<QuizItem data={quizData[currentIdx]} selected={selected} setSelected={setSelected} />

					{(selected != -1) ? (
						<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2 pt-3">
							<button className="btn btn-success me-md-2" type="button" onClick={ () => nextQuestion()}>
								<i className="bi-arrow-right-square-fill me-3"></i>
								{(language === "ro") ? "Următoare intrebare" : "Следующий вопрос"}
							</button>
						</div>
					) : <></>}

				</div>

			</div>
		</div>

	)
}

function QuizItem(props) {
	const { language } = useLanguage()
	const { data, selected, setSelected } = props

	const getStyle = (question, idx) => {
		if (selected != -1) {
			console.log(`selected = ${selected}, idx = ${idx}, correct = ${question.correct}`);
			if (question.correct && idx === selected) {
				return "list-group-item-success"
			}
			if (question.correct) {
				return "list-group-item-secondary"
			}
			if (parseInt(selected) == idx && !question.correct) {
				return "list-group-item-danger"
			}

			return "list-group-item-light"
		} else {
			return "list-group-item-light"
		}
	}


	const onClick = (idx) => () => { if (selected == -1) { setSelected(idx) } }

	return (
		<>
			<h5 className="card-title">{data.question[language]}</h5>
			<ol class="list-group list-group-flush list-group-numbered mt-3">

				{data.answers.map((answer, idx) => {
					return (
						<li class={getStyle(answer, idx) + " list-group-item list-group-item-action"} onClick={onClick(idx)}>
							{answer[language]}
						</li>)
				})}
			</ol>


		</>
	)
}

export default Quiz;
