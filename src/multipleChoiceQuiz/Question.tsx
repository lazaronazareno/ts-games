import { IQuestion } from "./types";

export default function Question({
  questions,
  index,
  onAnswer
}
  :
  {
    questions: IQuestion[];
    index: number;
    onAnswer: (answer: string) => void
  }) {
  return (
    <div>
      <h3>{questions[index].question}</h3>
      <div>
        {[...questions[index].incorrectAnswers, questions[index].correctAnswer]
          .sort(() => 0.5 - Math.random())
          .map((answer) => (
            <button onClick={() => onAnswer(answer)} key={answer}>{answer}</button>
          ))}
      </div>
    </div>
  )
}