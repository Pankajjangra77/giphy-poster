import React, { useState } from "react";
import "./App.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CreateIcon from "@material-ui/icons/Create";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GifIcon from "@material-ui/icons/Gif";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CloseIcon from "@material-ui/icons/Close";
import LockIcon from "@material-ui/icons/Lock";
import Post from "./Post";

const GIPHY_API =
  "https://api.giphy.com/v1/gifs/search?api_key=MvIclgTmeF0dNQBiEKEY4DFi2BiRiH4n&limit=20&offset=0&q=";
const GIPHY_API_TRENDING =
  "https://api.giphy.com/v1/gifs/trending?api_key=MvIclgTmeF0dNQBiEKEY4DFi2BiRiH4n&limit=20&offset=0";

function App() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [text, setText] = useState("");
  const [selectedGifUrl, setSelectedGifUrl] = useState("");
  const [showGifOnInput, setShowGifOnInput] = useState(false);
  const [posts, setPosts] = useState([]);

  const showGiphyArea = () => {
    fetch(GIPHY_API_TRENDING)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setGifs(
          result.data.map((gif) => {
            return gif.images.fixed_height.url;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const searchGif = () => {
    if (search.length > 0) {
      fetch(GIPHY_API + search)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const hideGifhyArea = () => {
    setShow(false);
  };

  const selectGiphy = (e) => {
    const gifUrl = e.target.src;
    setSelectedGifUrl(gifUrl);
    setShowGifOnInput(true);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPosts([
      ...posts,
      {
        text: text,
        selectedGifUrl: selectedGifUrl,
      },
    ]);

    setText("");
    setSelectedGifUrl("");
    setShowGifOnInput(false);
  };

  return (
    <>
      <div className="postMaker__container">
        <div className="postMaker__content">
          <div className="postMaker__top" onClick={hideGifhyArea}>
            <div className="postMakerTop__option">
              <CreateIcon fontSize="small" className="topIcons__color" />
              <h3>Live Video</h3>
            </div>

            <div className="postMakerTop__option">
              <PhotoLibraryIcon fontSize="small" className="topIcons__color" />
              <h3>Photo/Video</h3>
            </div>

            <div className="postMakerTop__option">
              <VideocamIcon fontSize="small" className="topIcons__color" />
              <h3>Live Video</h3>
            </div>
            <h3>hello world</h3>
            <CloseIcon className="topIcons__color top__close" />
          </div>

          <div className="postMaker__mid" onClick={hideGifhyArea}>
            <AccountCircleIcon fontSize="large" style={{ color: "gray" }} />
            <form>
              <input
                className="postMaker__input"
                placeholder="Write Somethig here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="selected__input__gif">
                {showGifOnInput && <img src={selectedGifUrl} alt="giphy" />}
              </div>
            </form>
          </div>

          <div className="postMaker__bottom">
            <div className="postMaker__option">
              <GroupAddIcon style={{ color: "skyblue" }} />
              <h3>Tag friends</h3>
            </div>

            <div className="postMaker__option">
              <LocationOnIcon style={{ color: "red" }} />
              <h3>Check in</h3>
            </div>

            <div className="postMaker__option" onClick={showGiphyArea}>
              <GifIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "30%",
                }}
              />
              <h3>GIF</h3>
            </div>

            <div className="postMaker__option">
              <DateRangeIcon
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "30%",
                }}
              />
              <h3>Tag Event</h3>
            </div>
          </div>
          <div className="bottom__buttons">
            <button type="button">
              <LockIcon fontSize="small" /> Only me
            </button>
            <button onClick={handleSubmit} type="submit">
              Post it
            </button>
          </div>
        </div>

        {show && (
          <div className="giphy__container">
            <div className="giphy__area">
              <div className="giphy__search">
                <input
                  type="text"
                  placeholder="Search Gif"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchGif}>Search</button>
              </div>
              <div className="giphy__elements" onClick={selectGiphy}>
                {gifs.map((gif, index) => {
                  return (
                    <div key={index} className="item">
                      <img src={gif} alt="gif" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Rendering Posts on page */}
      <div className="rendered__posts" onClick={hideGifhyArea}>
        {posts.map((post, index) => {
          return (
            <Post key={index} text={post.text} imgUrl={post.selectedGifUrl} />
          );
        })}
      </div>
    </>
  );
}

export default App;
