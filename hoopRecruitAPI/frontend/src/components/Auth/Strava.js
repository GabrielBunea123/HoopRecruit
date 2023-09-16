import axios from "axios";
import React from "react";
import { BASE_URL } from "../../config";

const Strava = () => {

  const requireAccessToken = async () => {
    await axios.get(BASE_URL + "/authentication/get-auth-url-strava")
      .then((res) => {
        window.location.replace(res.data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-2">
      <button onClick={requireAccessToken} className="strava-button">
        <div className="d-flex">
          <div>
            <i className="fa-brands fa-strava fa-2xl pe-3"></i>
          </div>
          <div>Continue with Strava</div>
        </div>
      </button>
    </div>
  );
};

export default Strava;
