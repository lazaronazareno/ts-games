import { useEffect, useState } from "react"
import WpsGame from "./game";

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
          <span>example : "anime"</span>
          <form onSubmit={handleTopic}>
            <input
              type='text'
              autoFocus
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {topic && (
        <WpsGame
          list={list}
          topic={topic}
        />
      )}
    </main>
  )
}