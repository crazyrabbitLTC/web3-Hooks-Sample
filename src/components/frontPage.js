import React from "react";
import logo from "../logo.svg";
import "../App.css";


function FrontPage(props) {
    //console.log(`The value passed is: ${value}`);
  const {web3, drizzleUtils, accounts} = props.state;
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The account: {accounts ? accounts[0] : "loading"}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
}

export default FrontPage