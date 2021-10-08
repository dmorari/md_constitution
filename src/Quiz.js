import { useLanguage } from "./context/language";
import { quizData as _quizData} from "./quizData";
import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from "react-router-dom";


const TARGET_COUNT = 20;

function Quiz(props) {
	const shuffleQuizData = () => {
		const newData = [..._quizData]
		return newData.map(question => {
			let newQuestion = {... question};
			newQuestion.answers = shuffle([...newQuestion.answers]);
			return newQuestion;
		})
	}

	const [quizData, setQuizData] = useState(shuffleQuizData())

	const [questionSeen, setQuestionsSeen] = useState([])
	const randomIndex = () => {
		var idx = -1;
		while (questionSeen.includes(idx = Math.floor(Math.random() * quizData.length))) { }
		return idx;
	}

	const { language } = useLanguage()
	const [currentIdx, setCurrentIdx] = useState(randomIndex());
	const [selected, setSelected] = useState(-1);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);


	const nextQuestion = () => {
		setCorrectAnswerCount(correctAnswerCount + (quizData[currentIdx].answers[selected].correct ? 1 : 0));
		setQuizData(shuffleQuizData());
		questionSeen.push(currentIdx)
		setQuestionsSeen(questionSeen);
		setCurrentIdx(randomIndex());
		setSelected(-1);
		setQuizData(shuffleQuizData());
	}

	const reset = () => {
		setCorrectAnswerCount(0);
		setQuestionsSeen([]);
		setCurrentIdx(randomIndex());
		setSelected(-1);
	}

	return (
		questionSeen.length >= TARGET_COUNT ?
			<ResultsPage correctCount={correctAnswerCount} reset={reset} /> :
			<QuizItem answeredQuestionCount={questionSeen.length + 1} selected={selected} setSelected={setSelected} quizItemData={quizData[currentIdx]} nextQuestion={nextQuestion} />

	)
}

function ResultsPage(props) {
	const { language } = useLanguage()
	const { correctCount, reset } = props
	const percent = ((correctCount / TARGET_COUNT) * 100).toFixed(2)

	const textRo = percent > 50 ? "Ați susținut examenul de constituție" : "Nu ați susținut examenul  de constituție. Mai incercați"
	const textRu = percent > 50 ? "Вы успешно сдали экзамен на знание конституции" : "Вы не сдали экзамен на знание конституции. Пробуйте еще"

	const style = {
		'width' : percent+"%"
	}
	return (
		<div className="container">
			<div className="px-4 py-2 my-5 text-center">
				<h1 className="display-5 fw-bold">{percent}%</h1>
				<div className="progress">
					<div className={"progress-bar " + (percent > 50 ? "bg-success" : "bg-warning")} role="progressbar" style={style} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
				<div className="col-lg-8 mx-auto mt-3">
					<p className="lead mb-4">{language == "ro" ? textRo : textRu}</p>

					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

						<button type="button" className="btn btn-dark btn-lg px-4 me-sm-3" onClick={() => reset()}>
							<i className="bi-arrow-clockwise me-3"></i>{language == "ro" ? "Examen nou" : "Повторить"}
						</button>

					</div>
				</div>
			</div>

		</div>
	)
}

function QuizItem(props) {
	const { language } = useLanguage()
	const { answeredQuestionCount, selected, setSelected, quizItemData, nextQuestion } = props
	return (
		<div className="container mt-3">
			<div className="card">
				<div className="card-header">
					<div class="row">
						<div class="col-md-6">
							{language == "ro" ? "Selectează varianta corectă" : "Выберите правильный вариант ответа"}
						</div>
						<div class="col-md-6">
							<div className="d-grid gap-2 d-md-flex justify-content-md-end fw-light text-muted">
								{(language === "ro") ?
									"Întrebarea " + (answeredQuestionCount) + " din " + TARGET_COUNT
									:
									"Вопрос " + (answeredQuestionCount) + " из " + TARGET_COUNT
								}
							</div>

						</div>
					</div>

				</div>
				<div className="card-body">
					<QuizData data={quizItemData} selected={selected} setSelected={setSelected} />

					{(selected != -1) ? (
						<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2 pt-3">
							<button className="btn btn-success me-md-2" type="button" onClick={() => nextQuestion()}>
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

function QuizData(props) {
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


function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }
export default Quiz;
