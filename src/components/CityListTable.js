import React from "react";
import { useTranslation } from "react-i18next";



const CityListTable = (props) => {
  const { t } = useTranslation();

  return (
    <table>
      <tr>
        <th>{t("location")}</th>
        <th>{t("temperature")}</th>
        <th>{t("temperatureLow")}</th>
        <th>{t("temperatureHigh")}</th>
        <th>{t("description")}</th>
      </tr>
      {props.cityList.map((eachCity) => {
        return (
          <tr>
            <td>{eachCity?.name}</td>
            <td>{eachCity?.main?.temp}</td>
            <td>{eachCity?.main?.temp_min}</td>
            <td>{eachCity?.main?.temp_max}</td>
            <td>
              {eachCity.weather && (
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    eachCity?.weather[0]?.icon +
                    ".png"
                  }
                  alt={eachCity?.weather[0].description}
                />
              )}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default CityListTable;
