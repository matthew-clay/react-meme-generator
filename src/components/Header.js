import logo from "../images/troll-face.png";

export default function Header() {
  return (
    <header>
      <img className="header-img" src={logo} alt="header-logo" />
      <h1 className="header-title">Meme Generator</h1>
      <span className="header-info">React Course - Project 3</span>
    </header>
  );
}
