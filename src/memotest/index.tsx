import { useEffect, useState } from "react"
import { IMAGES } from "./images"
import confetti from 'canvas-confetti'
import './memotest.css'

export default function Memotest() {
  const [guessed, setGuessed] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [winner, setWinner] = useState<boolean>(false)

  const resetGame = () => {
    setSelected([])
    setGuessed([])
    setWinner(false)
  }

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
        setGuessed((guessed) => guessed.concat(selected))
      }

      setTimeout(() => setSelected([]), 500)
    }
  }, [selected])

  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      confetti()
      setWinner(true)
    }
  }, [guessed])

  return (
    <main>
      <h1 style={{ margin: "1rem" }}>Memotest</h1>
      <ul className="memotest">
        {IMAGES.map((image, index) => {
          const [, url] = image.split('|')
          return (
            <li
              key={image}
              tabIndex={0}
              className="card"
              onClick={() => selected.length < 2 && setSelected((selected) => selected.concat(image))}
              onKeyDown={(e) => (
                ["Enter", " "].includes(e.key) &&
                selected.length < 2 &&
                setSelected((selected) => selected.concat(image)))
              }
            >
              {selected.includes(image) || guessed.includes(image) ? (
                <img className="selected" alt='icon' src={url} />
              ) : (
                <img
                  src="https://icongr.am/clarity/application.svg?size=128&color=42d74c"
                  alt="memo-image"
                />
              )}
            </li>
          )
        })
        }
      </ul>
      {winner && (
        <div className="winner">
          <div>
            <h1>You Win!</h1>
            <button onClick={resetGame}>Play again</button>
          </div>
        </div>
      )}
    </main>
  )
}