import { reset } from "canvas-confetti";
import { useEffect, useState } from "react"
import './index.css'

interface Word {
  word: string;
}

interface Props {
  list: string[],
  topic: string,
  setTopic: Function,
  setList: Function
}

export default function WpsGame({ list, topic, setTopic, setList }: Props) {
  console.log(list[(Math.random() * list.length)])
  console.log(list)
  const [word, setWord] = useState(() => list[(Math.random() * list.length) | 0])
  const [characterCount, setCharacterCount] = useState(0)
  const [buffer, setBuffer] = useState('')
  const [time, setTime] = useState(0)
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (buffer === word) {
      setWord(list[(Math.random() * list.length) | 0])
      setCharacterCount((characterCount) => characterCount + word.length)
    }
    setBuffer('')
  }

  const resetGame = () => {
    setWord(list[(Math.random() * list.length) | 0])
    setBuffer('')
    setTime(60)
    setCharacterCount(0)
  }

  const resetTopic = () => {
    setTopic('')
    setList([])

    setBuffer('')
    setWord('')
    setTime(60)
    setCharacterCount(0)
  }

  const saveScore = () => {
    const prevScore = window.localStorage.getItem('score')
    if (prevScore) {
      const parsedPrevScore = JSON.parse(prevScore)
      const obj = { score: characterCount, name: name }
      window.localStorage.setItem('score', JSON.stringify([...parsedPrevScore, obj]))
    } else {
      window.localStorage.setItem('score', JSON.stringify([{ score: characterCount, name: name }]))
    }

    setName('')
    setBuffer('')
    setWord(list[(Math.random() * list.length) | 0])
    setCharacterCount(0)
  }

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)

      return () => clearTimeout(timeout)
    }
  }, [time])

  useEffect(() => {
    setWord(list[(Math.random() * list.length) | 0])
  }, [list])

  return (
    <>
      {list.length > 0 && (
        <>
          <h2>Type "{topic}" words</h2>
          <div className="wps-game" >
            <h2>Characters typed : {characterCount}</h2>
            <h2>Remaining time : {time}</h2>
          </div>
          {time ? (
            <>
              <h1 style={{ fontSize: '3rem' }}>{word}</h1>
              <form className="wps-game-form" onSubmit={handleSubmit}>
                <div className="wps-form-input-content">
                  <input
                    type='text'
                    placeholder=" "
                    value={buffer}
                    onChange={(e) => setBuffer(e.target.value)}
                    className="wps-form-input"
                  />
                  <label className="wps-form-label">Word</label>
                </div>
                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            characterCount > 0 && time === 0 ? (
              <button type='button' onClick={resetGame}>Play Again</button>
            ) : (
              <>
                <button type='button' onClick={() => setTime(60)}>Play</button>
                <button type='button' onClick={resetTopic}>Change topic</button>
              </>
            )
          )}
          {characterCount > 0 && time === 0 && (
            <>
              <form className="wps-game-form">
                <h2>Your score is : {characterCount}!</h2>
                <div className="wps-form-input-content">
                  <input
                    type='text'
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="wps-form-input"
                  />
                  <label className="wps-form-label">Name</label>
                </div>
                <button type="button" onClick={saveScore}>Save Score</button>
              </form>
            </>
          )}
        </>
      )}
    </>
  )
}