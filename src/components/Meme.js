import { useEffect, useState } from "react";

export default function Meme() {
  // create state with top, bottom text and random image.
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomMeme: "http://i.imgflip.com/1bij.jpg",
  });

  // create allMemes state which we will fetch data with api url and set to allMemes state.
  const [allMemes, setAllMemes] = useState([]);

  const url = "https://api.imgflip.com/get_memes";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setAllMemes(json.data.memes))
      .catch((err) => console.log(err));
  }, []); // <= *** remember dependencies array

  const getMemesImage = () => {
    const randomNumber = Math.floor(Math.random * allMemes.length);
    const memeImageSrc = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomMeme: memeImageSrc,
    })); // <= () parenthesis here is used for implicit return
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAllMemes((prevMeme) => ({
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
