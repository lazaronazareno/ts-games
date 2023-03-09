import { useState } from "react"
import { Award } from "./types";

const AWARDS: Award[] = [
  {
    title: "Small Prize",
    label: "You can do better...",
    image: "https://media1.giphy.com/media/ouE6OPO1MADM4/giphy.gif?cid=ecf05e47ne4lxp2o6h8tckwn20emf8hjklyn3c84t8kw7h6h&rid=giphy.gif&ct=g",
    price: 2,
  },
  {
    title: "Medium Prize",
    label: "Good Job! You are almost good...",
    image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjVjZWUzYTNlMGU0OTkxZTIyMDBmNmFiNDhhMTkwMTg4MTMxZjFmOCZjdD1n/Hc8PMCBjo9BXa/giphy.gif",
    price: 5,
  },
  {
    title: "Big Prize",
    label: "Perfect!",
    image: "https://media3.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=ecf05e47u8ohc7yk2nul4le18v9bb48cu346154deb2p9z13&rid=giphy.gif&ct=g",
    price: 10,
  },
]


export default function Finished({ score, onRedeem }: { score: number; onRedeem: (awards: Award) => void }) {
  const [awards, setAwards] = useState(() =>
    AWARDS.map((award) => ({ ...award, isRedeemed: false }))
  )

  function handleRedeem(redeemed: Award) {
    setAwards((award) =>
      award.map((prize) => {
        if (prize.title === redeemed.title) {
          return { ...prize, isRedeemed: true }
        }

        return prize
      })
    )
    onRedeem(redeemed)
  }

  return (
    <div>
      <h2>Game Over</h2>
      <h2>Score : {score}</h2>
      <div>
        {awards.map((prize) => (
          <div style={{ gap: "1rem", textAlign: "center" }} key={prize.title} >
            {prize.isRedeemed ? (
              <>
                <h2>{prize.label}</h2>
                <img src={prize.image} alt={prize.title} style={{ height: "300px" }} />
              </>
            ) : (
              <button
                disabled={score < prize.price}
                onClick={() => handleRedeem(prize)}>{prize.title} - {prize.price} points
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}