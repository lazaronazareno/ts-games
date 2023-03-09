import { useEffect, useState } from "react"
import Finished from "./Finished"
import Question from "./Question"
import { Award, IQuestion } from "./types"
import './index.css'

export default function Quiz() {
  const [questions, setQuestions] = useState<Array<IQuestion>>()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  let isFinished = index >= 10
  const [loading, setLoading] = useState(true)

  function handleClick(answer: string) {
    if (questions![index].correctAnswer === answer) {
      setScore(score => score + 1)
    }
    setIndex(index => index + 1)
  }

  function handleRedeem(redeemed: Award) {
    setScore((score) => score - redeemed.price)
  }

  const fetchData = async () => {
    const response = await fetch('https://the-trivia-api.com/api/questions?limit=10&region=AR')
    const data = await response.json()

    setQuestions(data)
  };

  function playAgain() {
    setQuestions([])
    setLoading(true)
    setScore(0)
    setIndex(0)
    fetchData()

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <main>
      <h1>Quiz</h1>
      {loading && (<span>Loading...</span>)}
      {questions && !loading && !isFinished && (
        <Question questions={questions} index={index} onAnswer={handleClick} />
      )}
      {isFinished && (
        <>
          <Finished score={score} onRedeem={handleRedeem} />
          <button onClick={playAgain}>Play Again</button>
        </>
      )}
    </main>
  )
}
