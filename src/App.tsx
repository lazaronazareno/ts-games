import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Memotest from "./memotest"
import Header from "./Header"
import Pokemon from "./pokemon"
import WordsPerMinute from "./wordsPerMinute"
import Quiz from "./multipleChoiceQuiz"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memotest" element={<Memotest />} />
        <Route path="/wpm" element={<WordsPerMinute />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  )
}

export default App
