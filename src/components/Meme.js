import { useEffect, useState } from "react";
import { toJpeg } from "html-to-image"; // add html-to-image

export default function Meme() {
  // create state with top, bottom text and random image.
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
  });

  const [memeStats, setMemeStats] = useState({
    randomMemeImage: "https://i.imgflip.com/1bgw.jpg",
    memeName: "Futurama Fry",
  });

  // create allMemes state which we will fetch data with api url and set to allMemes state.
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    const url = "https://api.imgflip.com/get_memes";
    const getMemesFromAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setAllMemes(json.data.memes);
    };
    getMemesFromAPI();
  }, []); // <= *** remember dependencies array

  const getMemesImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMemeStats((prevMemeStats) => ({
      ...prevMemeStats,
      randomMemeImage: allMemes[randomNumber].url,
      memeName: allMemes[randomNumber].name,
    })); // <= () parenthesis here is used for implicit return
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // destructure event object which is from browser
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const downloadMeme = () => {
    const memeNodeTag = document.getElementById("meme-node");

    toJpeg(memeNodeTag).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `${memeStats.memeName}.jpeg`;
      link.href = dataUrl;
      link.click();
      link.remove();
    });
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
          Get a new Meme image🙂.
        </button>
      </form>
      <div className="container">
        <div className="memeContainer" id="meme-node">
          <img
            src={memeStats.randomMemeImage}
            alt="meme"
            className="result-meme"
          />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>

        <button className="btn-download" onClick={downloadMeme}>
          Download 👇🏻
        </button>
      </div>
    </main>
  );
}
