import { useEffect, useState } from "react"

interface Word {
  word: string;
}

interface Props {
  list: string[],
  topic: string
}

export default function WpsGame({ list }: Props) {
  console.log(list[(Math.random() * list.length)])
  console.log(list)
  const [word, setWord] = useState(() => list[(Math.random() * list.length) | 0])
  const [characterCount, setCharacterCount] = useState(0)
  const [buffer, setBuffer] = useState('')
  const [time, setTime] = useState(0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (buffer === word) {
      setWord(list[(Math.random() * list.length) | 0])
      setCharacterCount((characterCount) => characterCount + word.length)
    }
    setBuffer('')
  }

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)

      return () => clearTimeout(timeout)
    }
  }, [time])

  useEffect(() => {
    if (list.length > 0) {
      setWord(list[(Math.random() * list.length) | 0])
    }
  }, [list])

  return (
    <>
      {list.length > 0 && (
        <>
          <div style={{ display: "flex", gap: '1rem', justifyContent: 'space-evenly' }}>
            <h2>Characters typed : {characterCount}</h2>
            <h3>Remaining time : {time}</h3>
          </div>
          {time ? (
            <>
              <h1 style={{ fontSize: '3rem' }}>{word}</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  autoFocus
                  value={buffer}
                  onChange={(e) => setBuffer(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            <button onClick={() => setTime(60)}>PLAY</button>
          )}
        </>
      )}
    </>
  )
}