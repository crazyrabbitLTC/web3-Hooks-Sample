import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const getWeb3 = require("@drizzle-utils/get-web3");
const createDrizzleUtils = require("@drizzle-utils/core");

function App() {
  const initialState = {
    web3: null,
    drizzleUtils: null,
    accounts: null
  };

  const [state, setAppState] = useState(initialState);

  //setup web3
  useEffect(() => {
    const setup = async () => {
      const web3 = await getWeb3();
      const drizzleUtils = await createDrizzleUtils({ web3 });
      const accounts = await drizzleUtils.getAccounts();

      console.log(`Accounts: ${accounts}`);
      setAppState({ ...state, web3, drizzleUtils, accounts });
    };

    setup();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  );
}

export default App;
