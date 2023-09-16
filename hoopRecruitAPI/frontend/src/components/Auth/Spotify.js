import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../config";
import axios from "axios";

const Spotify = () => {
  const requireAccessToken = async () => {
    await axios.get(BASE_URL + "/authentication/get-auth-url-spotify")
      .then((res) => {
        window.location.replace(res.data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-3">
      <button onClick={requireAccessToken} className="spotify-button text-dark">
        <div className="d-flex">
          <div>
            <i className="fa-brands fa-spotify fa-2xl pe-2 text-dark"></i>
          </div>
          <div>Continue with Spotify</div>
        </div>
      </button>
    </div>
  );
};

export default Spotify;
