import { Route, Routes } from "react-router-dom"
import Memotest from "./memotest"
import Pokemon from "./pokemon"
import WordsPerMinute from "./wordsPerMinute"

function App() {

  return (
    <Routes>
      <Route path="/memotest" element={<Memotest />} />
      <Route path="/wpm" element={<WordsPerMinute />} />
      <Route path="/pokemon" element={<Pokemon />} />
    </Routes>
  )
}

export default App
