import { useEffect, useState } from "react";

export default function Meme() {
  const url = "https://api.imgflip.com/get_memes";

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomMeme: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  console.log(allMemes);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setAllMemes(json.data.memes));
  }, []); // remember *** dependencies array

  const getMemesImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const memeUrl = allMemes[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomMeme: memeUrl,
    }));
  };

  const handleChange = (event) => {
    console.log(event.target); // <input class="form-inputs mr" type="text" name="topText" placeholder="Top Text" value="">
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          className="form-inputs mr"
          type="text"
          name="topText"
          placeholder="Top Text"
          value={meme.topText}
          onChange={handleChange}
        />

        <input
          className="form-inputs"
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button className="form-btn" onClick={getMemesImage}>
          Get a new Meme image 🥷🏼.
        </button>
      </form>
      <div className="resultContainer">
        <img src={meme.randomMeme} alt="meme" className="result-meme" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
