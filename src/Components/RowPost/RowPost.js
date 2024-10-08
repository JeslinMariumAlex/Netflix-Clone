import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./RowPost.css";
import { imageUrl, API_KEY } from "../../constants/constants";
import axios from "../../axios";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");
  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, []);
  const opts = {
    height: "390",
    width: "100%",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}`).then((response) => {
      console.log(response.data);
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        console.log("Array empty");
      }
    });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <div key={obj.id}>
            <img
              onClick={() => handleMovie(obj.id)}
              className={props.isSmall ? "smallPoster" : "poster"}
              src={`${imageUrl + obj.backdrop_path}`}
              alt="poster"
            />
            <p className="movieTitle">
              {obj.title || obj.original_title || obj.original_name}
            </p>
          </div>
        ))}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
