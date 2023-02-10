import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link style={{ width: "20%", color: "black", fontSize: "bold", padding: 0 }} to='/'>Ts-Games</Link>
      <Link style={{ color: "black", width: "20%", padding: 0 }} to="/">
        <img src="https://icongr.am/entypo/back.svg?size=64&color=000000" alt="arrowBack" />
      </Link>
    </header>
  )
}