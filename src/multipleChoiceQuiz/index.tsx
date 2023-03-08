import { useEffect, useState } from "react"
import './index.css'

type Question = {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: [],
  question: string,
  tags: [],
  type: string,
  difficulty: string,
}

type Award = {
  title: string
  label: string
  price: number
}

const AWARDS: Award[] = [
  {
    title: "congratulations",
    label: "Good Job!",
    price: 2,
  },
  {
    title: "gift",
    label: "youtube video : ",
    price: 3,
  },
  {
    title: "image",
    label: "cat image",
    price: 5,
  },
]

export default function Quiz() {
  const [questions, setQuestions] = useState<Array<Question>>()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [awards, setAwards] = useState(() =>
    AWARDS.map((award) => ({ ...award, isRedeemed: false }))
  )
  let isFinished = index >= 10

  function handleClick(answer: string) {
    if (questions![index].correctAnswer === answer) {
      setScore(score => score + 1)
    }
    setIndex(index => index + 1)
  }

  function handleRedeem(redeemed: Award) {
    setAwards((award) =>
      award.map((prize) => {
        if (prize.title === redeemed.title) {
          return { ...prize, isRedeemed: true }
        }

        return prize
      })
    )

    setScore((score) => score - redeemed.price)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://the-trivia-api.com/api/questions?limit=10&region=AR')
      const data = await response.json()

      setQuestions(data)
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Quiz</h1>
      {isFinished ? (
        <div>
          <h2>Finished!</h2>
          <p>Score : {score}</p>
          <div>
            {awards.map((prize) => (
              <div key={prize.title} >
                {prize.isRedeemed ? (
                  <h2>{prize.label}</h2>
                ) : (
                  <button
                    disabled={score < prize.price}
                    onClick={() => handleRedeem(prize)}>{prize.title} - {prize.price} points
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {questions && (
            <div key={questions[index].id}>
              <h3>{questions[index].question}</h3>
              <div>
                {[...questions[index].incorrectAnswers, questions[index].correctAnswer]
                  .sort(() => 0.5 - Math.random())
                  .map((answer) => (
                    <button onClick={() => handleClick(answer)} key={answer}>{answer}</button>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
