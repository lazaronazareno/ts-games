import { useEffect, useState } from "react"
import WpsGame from "./game";
import './index.css'
interface Word {
  word: string;
}

type Score = {
  name: string
  score: number
  topic: string
}

export default function WordsPerMinute() {
  const [topic, setTopic] = useState('')
  const [isTopic, setIsTopic] = useState(false)
  const [list, setList] = useState<string[]>([])
  const [loadingScores, setLoadingScores] = useState(false)
  const [scores, setScores] = useState<Array<Score>>()

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

  useEffect(() => {
    const scoresStorage = window.localStorage.getItem('score')
    if (scoresStorage) {
      const sortedScore = JSON.parse(scoresStorage).sort(
        (a: Score, b: Score) =>
          (a.score < b.score) ?
            1 :
            (a.score > b.score ? -1 : 0))
      setScores(sortedScore)
    } else {
      setScores(scores)
    }

    setLoadingScores(false)
  }, [list, topic, loadingScores])

  return (
    <main className="wps" style={{ gap: '1rem' }}>
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
          setLoadingScores={setLoadingScores}
        />
      )}
      {scores && (
        <>
          <h2>Ranking</h2>
          <table>
            <thead>
              <tr>
                <th>Points</th>
                <th>User</th>
                <th>Word Topic</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score: any) => {
                return (
                  <tr
                    key={score.name - score.score - score.topic}
                  >
                    <td>{score.score}</td>
                    <td>{score.name}</td>
                    <td>{score.topic}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </main>
  )
}