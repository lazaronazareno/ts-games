import { useEffect, useState } from "react"
import WpsGame from "./game";
import './index.css'

const WORDS = [
  'Lorem',
  'ipsum',
  'dolor',
  'vitae',
  'consectetur',
  'mauris',
  'adipiscing',
  'Phasellus',
  'interdum'
]

interface Word {
  word: string;
}

export default function WordsPerMinute() {
  const [topic, setTopic] = useState('')
  const [isTopic, setIsTopic] = useState(false)
  const [list, setList] = useState<string[]>([])
  const [scores, setScores] = useState<string[] | string>((): string[] | string => {
    const prevScores = window.localStorage.getItem('score')
    return prevScores || []
  })
  console.log(scores)

  const handleTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTopic(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.datamuse.com/words?ml=${topic}&max=100`);
      const data = await response.json() as Word[];
      setList(data.map(word => word.word));
    };
    fetchData();

    return () => setIsTopic(false)
  }, [isTopic]);

  return (
    <main style={{ gap: '1rem' }}>
      {list.length === 0 && (
        <>
          <h2>Type a topic for start playing...</h2>
          <span>example : "anime", "flower", "space", etc</span>
          <form className="wps-form" onSubmit={handleTopic}>
            <div className="wps-form-input-content">
              <input
                type='text'
                placeholder=" "
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="wps-form-input"
              />
              <label className="wps-form-label">Topic</label>
            </div>
            <button type="submit">Set Topic</button>
          </form>
        </>
      )}
      {topic && (
        <WpsGame
          list={list}
          topic={topic}
          setList={setList}
          setTopic={setTopic}
        />
      )}
      {scores.length !== 0 && (
        <>
          <h2>Ranking</h2>
          {JSON.parse(scores).map((score: any) => {
            return <span key={score.name - score.score}>{score.score} - {score.name}</span>
          })}
        </>
      )}
    </main>
  )
}