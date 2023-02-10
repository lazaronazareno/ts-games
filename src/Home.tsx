import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h1>Ts-Games</h1>
      <Link to="/memotest">Memotest</Link>
      <Link to="/pokemon">Guess Pokemon</Link>
      <Link to="/wpm">Words Per Minute</Link>
    </main>
  );
};
