import React from "react";

const LanguageSelecter = (props) => {
  return (
    <select className="custom-select" onChange={props.onChange}>
      <option value="en">English</option> <option value="zh">Chinese</option>
    </select>
  );
};

export default LanguageSelecter;
