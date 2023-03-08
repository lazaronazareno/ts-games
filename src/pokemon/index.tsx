import { useEffect, useState } from "react"
import './index.css'

type Pokemon = {
  name: string
}

type ListPokemon = {
  [key: string]: Pokemon
}

export default function Pokemon() {
  const [hasWon, toggleWon] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [pokemonName, setPokemonName] = useState('')
  const [listPokemon, setListPokemon] = useState<ListPokemon>({})
  const [randomPokemon, setRandomPokemon] = useState(0)
  const [correctName, setCorrectName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (pokemonName.toLowerCase() === listPokemon![randomPokemon].name) {
      setIsWrong(false)
      toggleWon(true)
    } else {
      setIsWrong(true)
      setCorrectName(listPokemon![randomPokemon].name)
    }
  }

  const resetGame = () => {
    setRandomPokemon(Math.floor(Math.random() * Number(listPokemon.length)))
    setPokemonName('')
    setCorrectName('')
    toggleWon(false)
    setIsWrong(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const data = await response.json()

      setListPokemon(data.results)
    };

    fetchData();
  }, []);

  useEffect(() => {
    setRandomPokemon(Math.floor(Math.random() * Number(listPokemon.length)))
  }, [listPokemon]);

  return (
    <main className="pokemon">
      <div className="pokemon-title">
        <h1>Who's That</h1>
        <div>
          <img width={350} src="https://i.ibb.co/6NxtS7t/pngegg-5.webp" alt="Pokemon logo" />
          <img className="hide" width={150} src="https://i.ibb.co/wsVdHG6/question-pokemon.webp" alt="Pokemon logo" />
        </div>
      </div>
      <div>
        <div className="background-image">
          <img
            width={512}
            height={512}
            style={{
              imageRendering: "pixelated",
              filter: hasWon || isWrong ? "" : "brightness(0) invert(0) drop-shadow(0px 0px 2rem white)"
            }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon + 1}.png`}
            alt='Pokemon'
          />
        </div>
        {hasWon ? (
          <>
            <h2>Correct!</h2>
            <button type="button" onClick={resetGame}>Play again</button>
          </>
        ) : (
          isWrong ? (
            <>
              <h2>False! It was {correctName}!</h2>
              <button type="button" onClick={resetGame}>Play again</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setPokemonName(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          )
        )}
      </div>
    </main>
  )
}