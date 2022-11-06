// fetch weather data here
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./City.css";
import { useTranslation } from "react-i18next";
import "../translation/i18n";
import cloud from "../assets/cloud.gif";
import LanguageSelecter from "./LanguageSelector";
import CityListTable from "./CityListTable";

function City() {
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    console.log(languageValue);
    i18n.changeLanguage(languageValue);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric&lang=en`
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      // check if state has duplicate value
      const newCityList = cityList.find(
        (eachCity) => eachCity.name === result.name
      );
      if (!newCityList) {
        setCityList((prev) => {
          return [...prev, result];
        });
        setCity(""); // Clear the input
      } else {
        // if city already exists in the state show error toast
        toast.error("City Name Already Exists", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error(`${err}`, {
         // catch errors from api 
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
    setCity("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };
  //console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY);

  return (
    <div>
      <div className="header">
        <img src={cloud} width={"15%"} alt="weather" />
        <h1>{t("header")}</h1>
        <LanguageSelecter onChange={changeLanguageHandler} />
      </div>
      <input
        className="custom-input"
        placeholder={t("enterCity")}
        onChange={handleChange}
        name={city}
        value={city}
      />
      <button className="custom-button" onClick={handleSubmit}>
        {t("submit")}
      </button>
      {isLoading && <h2>Loading...</h2>}
      <CityListTable cityList={cityList} />
      <ToastContainer />
    </div>
  );
}

export default City;
