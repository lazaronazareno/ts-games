export type IQuestion = {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: [],
  question: string,
  tags: [],
  type: string,
  difficulty: string,
}

export type Award = {
  title: string
  label: string
  image: string
  price: number
}