import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [findingLocation, setFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude}%2C${longitude}`);
    setLocationErrorMsg("");
    setFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg("Unable to get your location");
    setFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setFindingLocation(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { latLong, handleTrackLocation, locationErrMsg, findingLocation };
};

export default useTrackLocation;
