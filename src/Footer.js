import React from "react";
import './Footer.css'
import littleBot from './assets/littleBot.gif'

const Footer = () => (
  <div className="footer">
    <p>Built By Joanne Sun</p>
    <img src={littleBot} width={"6%"} alt="bot"/>
    <p>with ❤︎</p>
  </div>
);

export default Footer;