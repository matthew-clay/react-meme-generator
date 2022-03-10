import testImage from "../images/universal_profile_pic.jpeg";

export default function Meme() {
  // const url = "https://api.imgflip.com/get_memes";

  return (
    <main>
      <form>
        <input
          className="form-inputs mr"
          type="text"
          name="topText"
          placeholder="Top Text"
        />

        <input
          className="form-inputs"
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
        />

        <button className="form-btn">Get a new Meme image 🥷🏼.</button>
      </form>
      <div className="resultContainer">
        <img src={testImage} alt="meme" className="result-meme" />
        <h2 className="meme-text top">Hahah, Very Funny 🐹</h2>
        <h2 className="meme-text bottom">Very Laughing</h2>
      </div>
    </main>
  );
}
